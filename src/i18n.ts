import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      tagline: "See Through the Noise.",
      hero_stats_1: "800M internet users",
      hero_stats_2: "53% share without verifying",
      hero_stats_3: "₹3500 Cr economic damage",
      cta_get_started: "Get Started",
      nav_home: "Home",
      nav_fact_check: "Fact-Check",
      nav_sources: "Sources",
      nav_community: "Community",
      nav_whatsapp: "WhatsApp Bot",
      nav_dashboard: "Dashboard",
      nav_pricing: "Pricing",
      nav_faq: "FAQ & Feedback",
      verdict_verified: "Verified",
      verdict_false: "False",
      verdict_unclear: "Unclear",
      credibility_score: "Credibility Score",
      reasoning: "Reasoning",
      sources_context: "Sources & Context",
      input_placeholder: "Paste a text claim, news headline, or URL...",
      check_button: "Check Now",
      flag_button: "Flag Content",
      community_flagged: "Community Flagged",
      pricing_free: "Free",
      pricing_premium: "Premium",
      pricing_api: "API Plan",
      pricing_upgrade: "Upgrade Now",
      faq_title: "Frequently Asked Questions",
      feedback_title: "Software Feedback",
      feedback_placeholder: "Tell us how we can improve TruthLens...",
      feedback_submit: "Submit Feedback",
    }
  },
  hi: {
    translation: {
      tagline: "शोर के पार देखें।",
      hero_stats_1: "800M इंटरनेट उपयोगकर्ता",
      hero_stats_2: "53% बिना पुष्टि किए साझा करते हैं",
      hero_stats_3: "₹3500 करोड़ का आर्थिक नुकसान",
      cta_get_started: "शुरू करें",
      nav_home: "होम",
      nav_fact_check: "तथ्य-जांच",
      nav_sources: "स्रोत",
      nav_community: "समुदाय",
      nav_whatsapp: "व्हाट्सएप बॉट",
      nav_dashboard: "डैशबोर्ड",
      nav_pricing: "कीमत",
      nav_faq: "FAQ और फीडबैक",
      verdict_verified: "सत्यापित",
      verdict_false: "असत्य",
      verdict_unclear: "अस्पष्ट",
      credibility_score: "विश्वसनीयता स्कोर",
      reasoning: "तर्क",
      sources_context: "स्रोत और संदर्भ",
      input_placeholder: "कोई दावा, समाचार हेडलाइन या URL पेस्ट करें...",
      check_button: "अभी जांचें",
      flag_button: "सामग्री फ्लैग करें",
      community_flagged: "समुदाय द्वारा फ्लैग किया गया",
      pricing_free: "मुफ्त",
      pricing_premium: "प्रीमियम",
      pricing_api: "API प्लान",
      pricing_upgrade: "अभी अपग्रेड करें",
      faq_title: "अक्सर पूछे जाने वाले प्रश्न",
      feedback_title: "सॉफ्टवेयर फीडबैक",
      feedback_placeholder: "हमें बताएं कि हम TruthLens को कैसे बेहतर बना सकते हैं...",
      feedback_submit: "फीडबैक भेजें",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
