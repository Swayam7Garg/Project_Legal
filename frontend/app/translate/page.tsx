'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, FileText, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function TranslatePage() {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';

  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ai/translate-document`, {
        documentText: inputText,
        lang: i18n.language
      });
      setTranslatedText(response.data.translation);
    } catch (err) {
      console.error(err);
      setError(t('translate.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#FCF5EF', padding: '40px 20px', minHeight: 'calc(100vh - 61px)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#455B3C', color: 'white', padding: '6px 16px', borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', marginBottom: 16 }}>
             <Sparkles size={14} /> AI-POWERED LEGAL SIMPLIFIER
           </div>
           <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', marginBottom: 16, fontFamily: hFont }}>
             {t('translate.page_title')}
           </h1>
           <p style={{ fontSize: 16, color: '#6A564A', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontFamily: hFont }}>
             {t('translate.page_sub')}
           </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          
          {/* Input Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#923c22', fontWeight: 700, fontSize: 14 }}>
              <FileText size={18} /> {isHi ? 'मूल दस्तावेज़' : 'Original Document'}
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('translate.placeholder')}
              style={{
                width: '100%',
                height: 400,
                padding: 24,
                borderRadius: 16,
                border: '1px solid #EAE1DA',
                backgroundColor: 'white',
                fontSize: 15,
                lineHeight: 1.6,
                fontFamily: hFont,
                resize: 'none',
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
            />
            <button
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              style={{
                width: '100%',
                background: '#923c22',
                color: 'white',
                padding: '16px',
                borderRadius: 32,
                border: 'none',
                fontWeight: 700,
                fontSize: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 12,
                cursor: (loading || !inputText.trim()) ? 'not-allowed' : 'pointer',
                opacity: (loading || !inputText.trim()) ? 0.7 : 1,
                transition: 'all 0.2s',
                fontFamily: hFont
              }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {loading ? (isHi ? 'सरल बनाया जा रहा है...' : 'Simplifying...') : t('translate.btn')}
            </button>
          </div>

          {/* Output Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#455B3C', fontWeight: 700, fontSize: 14 }}>
              <Sparkles size={18} /> {t('translate.result_title')}
            </div>
            <div
              style={{
                width: '100%',
                height: 468, // Account for button height
                padding: 24,
                borderRadius: 16,
                border: '1px solid #EAE1DA',
                backgroundColor: 'white',
                fontSize: 15,
                lineHeight: 1.6,
                fontFamily: hFont,
                overflowY: 'auto',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                position: 'relative'
              }}
            >
              {error ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#dc2626', background: '#fef2f2', padding: 16, borderRadius: 8 }}>
                  <AlertCircle size={20} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{error}</span>
                </div>
              ) : translatedText ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{translatedText}</div>
              ) : (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#A0A0A0' }}>
                   <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FCF5EF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                     <ArrowRight size={24} color="#D9CBBF" />
                   </div>
                   <p style={{ fontSize: 14, maxWidth: 200 }}>
                     {isHi ? 'आपका सरल किया गया दस्तावेज़ यहाँ दिखाई देगा।' : 'Your simplified document will appear here.'}
                   </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Feature Highlights */}
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {[
            { title: isHi ? '12वीं कक्षा का स्तर' : 'Graduation Level', desc: isHi ? 'जटिल कानूनी शब्दों को सरल रोजमर्रा की भाषा में बदलना।' : 'Transforms dense legal terminology into simple, everyday language.' },
            { title: isHi ? 'गोपनीय' : 'Confidential', desc: isHi ? 'आपका डेटा सुरक्षित है और इसका उपयोग केवल स्पष्टीकरण के लिए किया जाता है।' : 'Your data is processed securely and used only for exploration.' },
            { title: isHi ? 'द्विभाषी' : 'Bilingual', desc: isHi ? 'हिंदी और अंग्रेजी दोनों भाषाओं में दस्तावेज़ों का समर्थन करता है।' : 'Full support for documents in both Hindi and English languages.' },
          ].map((feature, i) => (
            <div key={i} style={{ background: '#EAE1DA', padding: 24, borderRadius: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{feature.title}</h4>
              <p style={{ fontSize: 13, color: '#6A564A', lineHeight: 1.5, margin: 0 }}>{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
