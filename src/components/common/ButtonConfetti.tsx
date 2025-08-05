import confetti from "canvas-confetti";

export function ButtonConfetti() {
  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#eab308", "#ea580c"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="relative">
      <button id="confetti-button" onClick={handleClick}>
        <div className="button-outer">
          <div className="button-inner flex items-center justify-center">
            <span className="text-5xl xl:text-[48px] xl:leading-[56px] text-center">Press me</span>
          </div>
        </div>
      </button>
    </div>
  );
}
