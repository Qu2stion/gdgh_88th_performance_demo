export default function LocationMap() {
  return (
    <div className="w-full aspect-[16/9.5] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.6442375121223!2d126.93580007571234!3d37.56344482430563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3563772e2e3c2e4f%3A0x4679094cc5b446cd!2z7Jew7IS464yA7ZWZ6rWQIO2VmeyDne2ajOq0gA!5e0!3m2!1sko!2skr!4v1768073261442!5m2!1sko!2skr"
        className="w-full h-full"
        style={{ border:0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
    </div>
  );
}