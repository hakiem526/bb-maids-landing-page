import { useEffect, useState } from "react";
import PreloadManager, { PreloadState } from "../managers/preload-manager";

export function usePreloadProgress() {
  const [state, setState] = useState<PreloadState>(
    PreloadManager.instance.getState()
  );

  useEffect(() => {
    const unsubscribe = PreloadManager.instance.subscribe(setState);
    // Idempotent; safe to call many times
    PreloadManager.instance.start();
    return unsubscribe;
  }, []);

  return state;
}
