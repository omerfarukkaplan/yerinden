export {};

declare global {
  interface Window {
    Paddle: {
      Initialize: (options: { token: string }) => void;
      Environment: {
        set: (env: "production" | "sandbox") => void;
      };
      Checkout: {
        open: (options: any) => void;
      };
    };
  }
}