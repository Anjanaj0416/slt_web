// https://github.com/apal21/nextjs-progressbar/issues/86

"use client";
import { useEffect } from "react";
import NProgress from "nprogress";
import { useTheme } from "@mui/material";

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

const ProgressBar = () => {
  const theme = useTheme();

  const styles = (
    <style>
      {`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${theme.palette.primary.main};
          position: fixed;
          z-index: 9999999999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }
        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main};
          opacity: 1.0;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
    `}
    </style>
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return styles;
};

export default ProgressBar;
