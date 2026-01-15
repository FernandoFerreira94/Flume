export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="pl-50  max-sm:pl-0  w-full h-full max-sm:mb-10">
      <div className="w-full container h-full px-24 py-8 mx-auto  max-sm:px-4">
        {children}
      </div>
    </section>
  );
}
