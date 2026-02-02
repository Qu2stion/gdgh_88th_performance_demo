export default function LocationMap() {
  const placeName = encodeURIComponent("연세대학교 학생회관");
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${placeName}`;
  
  // API 키가 없을 경우 사용하는 완성형 임베드 링크입니다.
  const fallbackUrl = `https://maps.google.com/maps?q=${placeName}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <iframe
        src={fallbackUrl}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}