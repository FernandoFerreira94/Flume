export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="pl-50  w-full h-full">
      <div className="w-full container h-full px-24 py-8 mx-auto">
        {children}
      </div>
    </section>
  );
}
