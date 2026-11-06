'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { demoHref } from '@/lib/site-config';
import type { PandaController } from '@/lib/panda-scene';
import { motionAllowed } from '@/lib/motion-preference';

export function PandaExperience() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<PandaController | null>(null);
  const navigation = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  );
  const [entering, setEntering] = useState(false);
  const [origin, setOrigin] = useState({ x: '70%', y: '50%' });

  useEffect(() => {
    const target = host.current;
    if (!target) return;
    const abort = new AbortController();
    let disposed = false;
    const reset = () => {
      setEntering(false);
      if (navigation.current) clearTimeout(navigation.current);
      navigation.current = null;
    };
    window.addEventListener('pageshow', reset);
    // Import only in the browser; a real link is available before enhancement.
    void import('@/lib/panda-scene')
      .then(async ({ createPandaScene }) => {
        if (disposed) return;
        const scene = await createPandaScene(target, abort.signal, () => {
          if (!disposed) setState('fallback');
        });
        if (disposed) {
          scene.dispose();
          return;
        }
        controller.current = scene;
        setState('ready');
      })
      .catch(() => {
        if (!disposed) setState('fallback');
      });
    return () => {
      disposed = true;
      abort.abort();
      controller.current?.dispose();
      controller.current = null;
      if (navigation.current) clearTimeout(navigation.current);
      window.removeEventListener('pageshow', reset);
    };
  }, []);

  function enter(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (event.detail && controller.current) {
      const r = event.currentTarget.getBoundingClientRect();
      if (
        !controller.current.hit(
          (event.clientX - r.left) / r.width - 0.5,
          (event.clientY - r.top) / r.height - 0.5,
        )
      ) {
        event.preventDefault();
        return;
      }
    }
    if (!motionAllowed()) return;
    event.preventDefault();
    if (navigation.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: `${event.detail ? event.clientX : box.x + box.width / 2}px`,
      y: `${event.detail ? event.clientY : box.y + box.height / 2}px`,
    });
    setEntering(true);
    navigation.current = setTimeout(
      () => window.location.assign(demoHref),
      650,
    );
  }

  return (
    <figure className="panda-experience" data-state={state}>
      <a
        className="panda-portal"
        draggable={false}
        href={demoHref}
        onClick={enter}
        aria-label="Open the robotics demo by selecting the Franka Panda arm"
        onFocus={() => controller.current?.highlight(true)}
        onBlur={() => controller.current?.highlight(false)}
        onPointerMove={(event) => {
          const r = event.currentTarget.getBoundingClientRect();
          const hit = controller.current?.point(
            (event.clientX - r.left) / r.width - 0.5,
            (event.clientY - r.top) / r.height - 0.5,
          );
          event.currentTarget.dataset.hover = hit ? 'true' : 'false';
        }}
        onPointerLeave={(event) => {
          controller.current?.highlight(false);
          event.currentTarget.dataset.hover = 'false';
        }}
      >
        {/* The existing contact plate remains useful before WebGL loads or if it fails. */}
        <Image
          className="panda-fallback"
          src="/plate-contact.webp"
          alt="A robotic gripper in a physical field study"
          fill
          sizes="(max-width: 900px) 100vw, 53vw"
        />
        <div className="panda-canvas" ref={host} aria-hidden="true" />
      </a>
      <figcaption className="sr-only">
        Franka Panda. Interactive, authored pick-and-place motion study. Select
        the arm to open the robotics demo.
      </figcaption>
      {entering &&
        createPortal(
          <div
            className="workspace-cloud"
            style={
              {
                '--portal-x': origin.x,
                '--portal-y': origin.y,
              } as React.CSSProperties
            }
          >
            <div />
            <output className="sr-only">Opening the Vivacity workspace</output>
          </div>,
          document.body,
        )}
    </figure>
  );
}
