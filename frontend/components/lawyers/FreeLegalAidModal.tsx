'use client';
import { X, Scale, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FreeLegalAidModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';

  if (!isOpen) return null;

  const services = isHi ? [
    'कानूनी कार्यवाही में अधिवक्ता द्वारा प्रतिनिधित्व।',
    'प्रक्रिया शुल्क, गवाहों के खर्चे और सभी न्यायालय शुल्क का भुगतान।',
    'अपील का ज्ञापन, पेपर बुक (अनुवाद सहित) तैयार करना।',
    'कानूनी दस्तावेज़, विशेष अनुमति याचिका आदि का मसौदा तैयार करना।',
    'निर्णयों, आदेशों और साक्ष्य नोटों की प्रमाणित प्रतियों की आपूर्ति।',
    'कल्याण कानूनों और सरकारी योजनाओं के तहत लाभों तक पहुंचने की सलाह।',
  ] : [
    'Representation by an Advocate in legal proceedings.',
    'Payment of process fees, expenses of witnesses and all other court charges.',
    'Preparation of pleadings, memo of appeal, paper book including translation.',
    'Drafting of legal documents, special leave petition etc.',
    'Supply of certified copies of judgments, orders, and evidence notes.',
    'Advice to access benefits under welfare statutes and Central/State schemes.',
  ];

  const cards = isHi ? [
    { title: 'कौन से न्यायालय?', body: 'केवल अधीनस्थ न्यायालयों तक सीमित नहीं। यह प्रथम दृष्टया न्यायाधिकरण से लेकर सर्वोच्च न्यायालय तक प्रदान की जाती है।' },
    { title: 'किस प्रकार के मामले?', body: 'सभी प्रकार के मामले, बशर्ते आप धारा 12 के तहत पात्रता पूरी करते हों और वास्तविक मामला हो।' },
    { title: 'पसंद का वकील?', body: 'हाँ। आप पैनल से वकील चुन सकते हैं और सचिव इसे विनियमन 7(6) के तहत स्वीकृति दे सकता है।' },
    { title: 'किसी भी चरण में?', body: 'हाँ। आप केवल परामर्श या किसी भी चरण में सहायता के लिए आवेदन कर सकते हैं।' },
  ] : [
    { title: 'Which Courts?', body: 'Not confined to subordinate Courts. Provided from the Court Tribunal at first instance all the way to the Supreme Court of India.' },
    { title: 'What kind of Cases?', body: 'All kinds of cases as long as you satisfy eligibility under Section 12 and have a genuine case.' },
    { title: 'Lawyer of Choice?', body: 'Yes. You can express your choice of lawyer from the panel, and the Secretary can allow it under regulation 7(6).' },
    { title: 'Any Stage?', body: 'Yes. You can get just a consultation, or apply for aid at any stage — even at the appeal stage.' },
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(26,10,5,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: 20,
    }}>
      <div style={{
        background: '#FFFDFB', borderRadius: 20, width: '100%', maxWidth: 700,
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(146,60,34,0.2)',
        fontFamily: hFont,
      }}>
        {/* Header */}
        <div style={{
          padding: '22px 28px', borderBottom: '1px solid #EAE1DA',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#FCF5EF',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ background: '#923c22', padding: 10, borderRadius: 12, display: 'flex' }}>
              <Scale size={22} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: 0, fontFamily: hFont }}>
                {isHi ? 'नि:शुल्क कानूनी सहायता (NALSA)' : 'Free Legal Aid (NALSA)'}
              </h2>
              <p style={{ fontSize: 12, color: '#6A564A', margin: '3px 0 0 0', fontFamily: hFont }}>
                {isHi ? 'कानूनी सेवा प्राधिकरण अधिनियम, 1987' : 'Legal Services Authorities Act, 1987'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex' }}>
            <X size={22} color="#6A564A" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>

          {/* Intro box */}
          <div style={{ background: '#EAE1DA', padding: 20, borderRadius: 14, borderLeft: '4px solid #923c22' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#923c22', margin: '0 0 8px 0', fontFamily: hFont }}>
              {isHi ? 'कानूनी सेवाएं क्या हैं?' : 'What are Legal Services?'}
            </h3>
            <p style={{ fontSize: 14, color: '#3A3A3A', lineHeight: 1.6, margin: 0, fontFamily: hFont }}>
              {isHi
                ? 'कानूनी सेवाएं कानूनी सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के अंतर्गत आने वाले समाज के कमज़ोर वर्गों को नि:शुल्क कानूनी सहायता प्रदान करना, लोक अदालतों का आयोजन, और सरकारी योजनाओं तक पहुंच सुनिश्चित करना शामिल है।'
                : 'Legal Services includes providing Free Legal Aid to those weaker sections of the society who fall within the purview of Section 12 of the Legal Services Authorities Act, 1987. It entails creating legal awareness, organizing Lok Adalats, social action litigation, and facilitating entitlements under government schemes.'}
            </p>
          </div>

          {/* Services list */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: '0 0 14px 0', fontFamily: hFont }}>
              {isHi ? 'कौन-कौन सी नि:शुल्क सेवाएं शामिल हैं?' : 'What is included in free legal services?'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#3A3A3A', lineHeight: 1.5 }}>
                  <CheckCircle2 size={17} color="#455B3C" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: hFont }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
            {cards.map((card, i) => (
              <div key={i} style={{ padding: 16, border: '1px solid #EAE1DA', borderRadius: 12, background: 'white' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#923c22', margin: '0 0 8px 0', fontFamily: hFont }}>{card.title}</h4>
                <p style={{ fontSize: 12, color: '#4A4A4A', lineHeight: 1.5, margin: 0, fontFamily: hFont }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '18px 28px', borderTop: '1px solid #EAE1DA', background: '#FCF5EF', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '10px 24px', background: 'white', border: '1.5px solid #EAE1DA',
            borderRadius: 24, fontWeight: 600, color: '#6A564A', cursor: 'pointer', fontFamily: hFont,
          }}>
            {isHi ? 'बंद करें' : 'Close'}
          </button>
          <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer" style={{
            padding: '10px 24px', background: '#923c22', border: 'none',
            borderRadius: 24, fontWeight: 700, color: 'white', cursor: 'pointer',
            textDecoration: 'none', fontFamily: hFont, fontSize: 14,
          }}>
            {isHi ? 'NALSA वेबसाइट देखें' : 'Visit NALSA Website'} →
          </a>
        </div>
      </div>
    </div>
  );
}
