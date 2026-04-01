'use client';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Home, ShoppingCart, Briefcase, FileText, Users, Navigation, Compass, FileSignature, Scale } from 'lucide-react';

export default function HomePage() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';

  return (
    <div style={{ flex: 1, backgroundColor: '#FCF5EF', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        padding: '80px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        background: 'radial-gradient(circle at center 20%, #FFFDFB 0%, #FCF5EF 60%)'
      }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E0ECD6', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
          <CheckCircle2 size={16} color="#455B3C" />
          <span style={{ fontSize: 13, color: '#455B3C', fontWeight: 600 }}>
            {isHi ? 'मुफ्त, गोपनीय और संवैधानिक रूप से गारंटीकृत' : 'Free, Confidential, and Constitutionally Guaranteed'}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, marginBottom: 12, maxWidth: 800 }}>
          {isHi ? 'अपने कानूनी अधिकारों को समझें, ' : 'Understand your legal rights, '}
          <span style={{ color: '#923c22', fontStyle: 'italic', fontWeight: 800 }}>{isHi ? 'सरलता से' : 'simply'}</span>
        </h1>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700, color: '#3A3A3A', marginBottom: 32, fontFamily: hFont }}>
          {isHi ? 'कानूनी जटिलताओं को पीछे छोड़ें।' : 'अपने कानूनी अधिकारों को सरलता से समझें।'}
        </h2>
        
        <p style={{ fontSize: 16, color: '#5A5A5A', lineHeight: 1.6, marginBottom: 40, maxWidth: 600, fontFamily: hFont }}>
          {isHi 
            ? 'कानून डरावना नहीं होना चाहिए। हम आपकी विशिष्ट जीवन स्थिति के आधार पर चरण-दर-चरण मार्गदर्शन प्रदान करते हैं, उस भाषा में जो आप बोलते हैं।'
            : "Navigating the law shouldn't be scary. We provide step-by-step guidance tailored to your specific life situation, in the language you speak."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/situations" style={{
            background: '#923c22', color: 'white', padding: '14px 28px', borderRadius: 28,
            fontWeight: 600, fontSize: 15, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'opacity 0.2s',
          }}>
            {isHi ? 'अपनी स्थिति खोजें' : 'Find My Situation'} <ArrowRight size={18} />
          </Link>
          <Link href="/lawyers" style={{
            background: 'white', color: '#923c22', padding: '14px 28px', borderRadius: 28,
            fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid #EAE1DA',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            {isHi ? 'वकील खोजें' : 'Explore Guides'}
          </Link>
        </div>
      </section>

      {/* Situations Grid */}
      <section style={{ padding: '60px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontFamily: hFont }}>
              {isHi ? 'हम आज आपकी कैसे मदद कर सकते हैं?' : 'How can we help you today?'}
            </h2>
            <p style={{ fontSize: 15, color: '#6A564A', fontFamily: hFont }}>
              {isHi 
                ? 'अनुकूलित कानूनी चरण और पास के संसाधन प्राप्त करने के लिए नीचे एक श्रेणी चुनें'
                : 'Select a category below to receive tailored legal steps and nearby resources'}
            </p>
          </div>
          <Link href="/situations" style={{ color: '#923c22', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontFamily: hFont }}>
            {isHi ? 'सभी स्थितियां देखें' : 'View all situations'} <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {[
            { title: isHi ? 'मकान मालिक विवाद' : 'Landlord Dispute', desc: isHi ? 'बेदखली नोटिस, सुरक्षा जमा और किराये के समझौतों के संबंध में अपने अधिकार जानें।' : 'Know your rights regarding eviction notices, security deposits, and rental agreements.', icon: <Home size={20} color="#923c22" />, slug: 'landlord' },
            { title: isHi ? 'उपभोक्ता शिकायत' : 'Consumer Complaint', desc: isHi ? 'दोषपूर्ण उत्पादों, अधिक शुल्क और अनुचित व्यापार प्रथाओं से खुद को बचाएं।' : 'Protect yourself against faulty products, overcharging, and unfair trade practices.', icon: <ShoppingCart size={20} color="#923c22" />, slug: 'consumer' },
            { title: isHi ? 'कार्यस्थल उत्पीड़न' : 'Workplace Harassment', desc: isHi ? 'उत्पीड़न की रिपोर्ट करने और रोजगार कानूनों को समझने के लिए सुरक्षित और गोपनीय कदम।' : 'Safe and confidential steps to report harassment and understand employment laws.', icon: <Briefcase size={20} color="#923c22" />, slug: 'workplace' },
            { title: isHi ? 'FIR दर्ज करना' : 'FIR Filing', desc: isHi ? 'किसी भी पुलिस स्टेशन में प्रथम सूचना रिपोर्ट (FIR) दर्ज करने का एक सरल तरीका।' : 'A simple walkthrough of how to file a First Information Report at any police station.', icon: <FileText size={20} color="#923c22" />, slug: 'fir' },
            { title: isHi ? 'घरेलू हिंसा' : 'Domestic Violence', desc: isHi ? 'घरेलू दुर्व्यवहार का सामना करने वालों के लिए तत्काल सहायता और कानूनी सुरक्षा आदेश।' : 'Immediate assistance and legal protection orders for those facing domestic abuse.', icon: <Users size={20} color="#923c22" />, slug: 'domestic' },
            { title: isHi ? 'यातायात उल्लंघन' : 'Traffic Violations', desc: isHi ? 'ट्रैफिक स्टॉप या दुर्घटनाओं के दौरान अपने जुर्माने, चालान और अधिकारों को समझें।' : 'Understand your fines, challans, and rights during traffic stops or accidents.', icon: <Navigation size={20} color="#923c22" />, slug: 'traffic' },
          ].map((s, i) => (
            <Link key={i} href={`/situations?prefill=${s.slug}`} style={{ background: 'white', borderRadius: 16, padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', border: '1px solid #FAF4EE', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ background: '#FCF5EF', width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontFamily: hFont }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: '#6A564A', lineHeight: 1.5, margin: 0, fontFamily: hFont }}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Demystified Section */}
      <section style={{ padding: '60px 20px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', background: '#455B3C', color: 'white', padding: '6px 16px', borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', marginBottom: 16 }}>
          {isHi ? 'AI-संचालित सरल अंग्रेजी और हिंदी सारांश' : 'AI-POWERED PLAIN ENGLISH & HINDI SUMMARIES'}
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', marginBottom: 40, fontFamily: hFont }}>
          {isHi ? 'कानूनी शब्दजाल, अब सरल भाषा में।' : 'Legal Jargon, Demystified.'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32, textAlign: 'left', alignItems: 'stretch' }}>
          
          {/* Example 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#EAE1DA', borderRadius: 16, padding: '32px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Scale size={16} color="#6A564A" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6A564A', letterSpacing: '0.5px' }}>{isHi ? 'मूल कानून (IPC 405)' : 'ORIGINAL STATUTE (IPC 405)'}</span>
              </div>
              <p style={{ fontSize: 15, color: '#3A3A3A', fontStyle: 'italic', lineHeight: 1.6 }}>
                "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property..."
              </p>
            </div>
            <div style={{ background: 'white', borderRadius: 16, padding: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <CheckCircle2 size={18} color="#455B3C" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#455B3C' }}>NYAYAMITRA PLAIN LANGUAGE</span>
              </div>
              <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.5, margin: 0 }}>
                {isHi ? 'यदि कोई आप पर अपनी संपत्ति के साथ विश्वास करता है और आप उसे अपने फायदे के लिए इस्तेमाल करते हैं, तो यह अपराध है।' : 'If someone trusts you with their property and you use it for yourself dishonestly, it is a crime.'}
              </p>
            </div>
          </div>

          {/* Example 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#EAE1DA', borderRadius: 16, padding: '32px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Scale size={16} color="#6A564A" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6A564A', letterSpacing: '0.5px' }}>{isHi ? 'मूल कानून (धारा 125, CrPC)' : 'ORIGINAL STATUTE (Sec 125, CrPC)'}</span>
              </div>
              <p style={{ fontSize: 15, color: '#3A3A3A', fontStyle: 'italic', lineHeight: 1.6 }}>
                "If any person having sufficient means neglects or refuses to maintain his wife, children or parents, unable to maintain themselves..."
              </p>
            </div>
            <div style={{ background: 'white', borderRadius: 16, padding: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <CheckCircle2 size={18} color="#455B3C" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#455B3C' }}>NYAYAMITRA PLAIN LANGUAGE</span>
              </div>
              <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.5, margin: 0 }}>
                {isHi ? 'यदि कोई व्यक्ति सक्षम होते हुए भी अपनी पत्नी, बच्चों या माता-पिता का भरण-पोषण करने से इनकार करता है, तो वे अदालत से मदद मांग सकते हैं।' : 'If a person can afford it but refuses to support their wife, children, or parents who can\'t support themselves, they have a right to ask the court for maintenance.'}
              </p>
            </div>
          </div>

        </div>

        <div style={{ marginTop: 40 }}>
          <Link href="/translate">
            <button style={{ background: '#455B3C', color: 'white', padding: '14px 40px', borderRadius: 32, border: 'none', fontWeight: 700, fontSize: 15, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'transform 0.2s' }}>
                {isHi ? 'किसी भी दस्तावेज़ का अनुवाद करें' : 'Translate Any Legal Document'} <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Services Footer area inner */}
      <section style={{ padding: '80px 20px 60px', maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        {[
          { icon: <Compass size={24} color="#923c22" />, title: isHi ? 'चरण-दर-चरण मार्गदर्शिका' : 'Step-by-Step Guides', desc: isHi ? 'इंटरैक्टिव फ़्लो जो आपको बताते हैं कि आपकी वर्तमान स्थिति के आधार पर आगे क्या करना है।' : 'Interactive flows that tell you exactly what to do next based on your current situation.' },
          { icon: <Users size={24} color="#923c22" />, title: isHi ? 'कानूनी सहायता वकील निर्देशिका' : 'Legal Aid Lawyer Directory', desc: isHi ? 'अपने शहर में सत्यापित प्रो बोनो वकीलों और कानूनी सहायता क्लीनिकों से तुरंत जुड़ें।' : 'Connect with verified pro bono lawyers and legal aid clinics in your city instantly.' },
          { icon: <FileSignature size={24} color="#923c22" />, title: isHi ? 'दस्तावेज़ जेनरेटर' : 'Document Generator', desc: isHi ? 'कानूनी रूप से सही नोटिस और आवेदन स्वचालित रूप से उत्पन्न करने के लिए सरल फ़ॉर्म भरें।' : 'Fill out simple forms to automatically generate legally sound notices and applications.' },
        ].map((item, i) => (
          <div key={i} style={{ flex: '1 1 250px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EAE1DA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontFamily: hFont }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: '#6A564A', lineHeight: 1.5, fontFamily: hFont }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* True Footer */}
      <footer style={{ background: '#F5EBE1', padding: '40px 20px', borderTop: '1px solid #EAE1DA' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 400 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#923c22', marginBottom: 16 }}>NyayaMitra <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>(न्यायमित्र)</span></div>
            <p style={{ fontSize: 13, color: '#5A5A5A', lineHeight: 1.5, marginBottom: 24, fontFamily: hFont }}>
              {isHi 
                ? 'प्रत्येक नागरिक को उनके अधिकारों के लिए खड़े होने के ज्ञान के साथ सशक्त बनाना। NyayaMitra एक सामाजिक प्रभाव पहल है जो प्रौद्योगिकी और सरलीकृत भाषा के माध्यम से भारतीय कानूनी प्रणाली को सभी के लिए सुलभ बनाने के लिए समर्पित है।'
                : 'Empowering every citizen with the knowledge to stand up for their rights. NyayaMitra is a social impact initiative dedicated to making the Indian legal system accessible to all through technology and simplified language.'}
            </p>
            <div style={{ background: '#FCF5EF', padding: 12, borderRadius: 8, border: '1px solid #EAE1DA' }}>
               <p style={{ fontSize: 11, color: '#6A564A', margin: 0, lineHeight: 1.4, fontFamily: hFont }}>
                 {isHi 
                  ? 'अस्वीकरण: यह प्लेटफॉर्म कानूनी जानकारी और मार्गदर्शन प्रदान करता है, कानूनी सलाह नहीं। विशिष्ट कानूनी कार्यवाही के लिए हमेशा एक योग्य पेशेवर से परामर्श लें।'
                  : 'Disclaimer: This platform provides legal information and guidance, not legal advice. Always consult with a qualified professional for specific legal proceedings.'}
               </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 60 }}>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>{isHi ? 'प्लेटफ़ॉर्म' : 'Platform'}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><Link href="/situations" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'कानूनी अधिकार' : 'Legal Rights'}</Link></li>
                <li><Link href="/lawyers" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'प्रो बोनो वकील' : 'Pro Bono Lawyers'}</Link></li>
                <li><Link href="#" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'दस्तावेज़ टेम्पलेट' : 'Document Templates'}</Link></li>
                <li><Link href="#" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'हिंदी संसाधन' : 'Hindi Resources'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>{isHi ? 'कंपनी' : 'Company'}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><Link href="#" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'कानूनी अस्वीकरण' : 'Legal Disclaimer'}</Link></li>
                <li><Link href="#" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}</Link></li>
                <li><Link href="#" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'सेवा की शर्तें' : 'Terms of Service'}</Link></li>
                <li><Link href="#" style={{ color: '#5A5A5A', textDecoration: 'none', fontSize: 13, fontFamily: hFont }}>{isHi ? 'हमसे संपर्क करें' : 'Contact Us'}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: 1100, margin: '40px auto 0', paddingTop: 20, borderTop: '1px solid #EAE1DA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: '#6A564A', fontFamily: hFont }}>
            {isHi ? '© 2024 NyayaMitra. स्पष्टता के माध्यम से नागरिकों को सशक्त बनाना।' : '© 2024 NyayaMitra. Empowering citizens through clarity.'}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
             {/* Simple social icon placeholders */}
             <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#D9CBBF' }}></div>
             <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#D9CBBF' }}></div>
             <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#D9CBBF' }}></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
