/** Corner brackets — the portfolio's signature motif. Purely decorative. */
export function Ticks({ all = false }: { all?: boolean }) {
  const base = "pointer-events-none absolute h-3 w-3 border-accent";
  return (
    <>
      <span aria-hidden className={`${base} -top-1.5 -left-1.5 border-t-[1.5px] border-l-[1.5px]`} />
      {all && <span aria-hidden className={`${base} -top-1.5 -right-1.5 border-t-[1.5px] border-r-[1.5px]`} />}
      {all && <span aria-hidden className={`${base} -bottom-1.5 -left-1.5 border-b-[1.5px] border-l-[1.5px]`} />}
      <span aria-hidden className={`${base} -right-1.5 -bottom-1.5 border-r-[1.5px] border-b-[1.5px]`} />
    </>
  );
}
