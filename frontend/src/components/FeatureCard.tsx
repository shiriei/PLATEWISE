interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

export function FeatureCard({ number, title, description }: FeatureCardProps) {
  return (
    <div className="border-4 border-brand-text p-8 bg-white shadow-[6px_6px_0px_0px_rgba(16,24,23,1)] flex flex-col h-full hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(16,24,23,1)] transition-all">
      <div className="font-montserrat font-black text-5xl text-brand-text mb-4 opacity-20">
        {number}
      </div>
      <h3 className="font-montserrat font-black text-xl mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <p className="font-inter font-medium text-brand-text leading-relaxed">
        {description}
      </p>
    </div>
  );
}
