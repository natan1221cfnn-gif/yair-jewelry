"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Award, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function VIPConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "bot",
      text: "שלום, אני רועי. אשמח לסייע לך בבחירת תכשיט, התאמת מידה או קביעת פגישת VIP אישית בסטודיו ברוטשילד. במה אוכל לעזור לך היום?",
      time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowBadge(false);

    // Simulate concierge typing delays
    setTimeout(() => {
      setIsTyping(false);
      
      let replyText = "";
      const textLower = textToSend.toLowerCase();

      if (textLower.includes("מידה") || textLower.includes("מידות") || textLower.includes("טבעת")) {
        replyText = "כדי למצוא את המידה המתאימה, תוכלי להשתמש במדריך המידות האינטראקטיבי שלנו הזמין בעמודי המוצרים. אם את עדיין מתלבטת, נוכל לתאם פגישה קצרה בסטודיו שלנו בתל אביב ונמדוד זאת יחד בצורה מקצועית.";
      } else if (textLower.includes("משלוח") || textLower.includes("מתי") || textLower.includes("משלוחים")) {
        replyText = "כל המשלוחים שלנו מבוטחים לחלוטין ונשלחים עם שליח VIP מיוחד עד פתח הבית ללא עלות נוספת. זמן ההגעה הוא בין 3 ל-5 ימי עסקים לכל חלקי הארץ.";
      } else if (textLower.includes("פגישה") || textLower.includes("תיאום") || textLower.includes("רוטשילד") || textLower.includes("סטודיו")) {
        replyText = "נשמח לארח אותך בסטודיו שלנו בשדרות רוטשילד 46, תל אביב. בתיאום מראש, נוכל להציג לך את כל הקולקציה באופן פרטי ושקט. השאירי לי את מספר הטלפון שלך ואחזור אלייך לתיאום פגישה מהיר.";
      } else if (textLower.includes("זהב") || textLower.includes("חומר") || textLower.includes("יהלום")) {
        replyText = "אנו עובדים אך ורק עם זהב צהוב, לבן ואדום 14K ו-18K מלוטש. כל היהלומים שלנו הם יהלומים טבעיים מובחרים (VS1+, צבע F+) ללא קונפליקט ובעלי תעודות גמולוגיות רשמיות.";
      } else {
        replyText = "שאלה מעולה! כל הפריטים בבית המלאכה שלנו מיוצרים בעבודת יד מוקפדת. תרצי שאחד מנציגי הסטודיו יתקשר אלייך ישירות לטלפון לפרטים נוספים או להתאמה אישית של תכשיט?";
      }

      const botMessage: Message = {
        id: `m-bot-${Date.now()}`,
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-50 select-none font-sans">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowBadge(false);
          }}
          className="relative w-14 h-14 bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 group border border-[#D4AF37]/35"
          aria-label="צ'אט יועץ סטודיו"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
          ) : (
            <MessageSquare className="w-6 h-6 transition-transform duration-300" />
          )}

          {/* Unread dot badge */}
          {showBadge && !isOpen && (
            <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center border border-white">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          )}
        </button>

        {/* Live Chat Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 left-0 w-[350px] sm:w-[380px] h-[500px] bg-white border border-[#F1F1F1] shadow-2xl flex flex-col overflow-hidden text-right text-[#111111]"
            >
              {/* Header */}
              <div className="p-4 bg-[#111111] text-white flex justify-between items-center border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  {/* Mock profile photo */}
                  <div className="relative w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center font-bold text-[#D4AF37] font-serif text-sm">
                    ר
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-black rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold flex items-center gap-1">
                      <span>רועי</span>
                      <span className="text-[10px] bg-[#D4AF37] text-[#111111] px-1 font-sans rounded-none font-bold uppercase">
                        EXPERT
                      </span>
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-light">מומחה סטודיו ושיבוץ</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-neutral-800 transition-colors rounded-full"
                  aria-label="סגור חלון"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Chat Message Window */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50 no-scrollbar">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[80%] ${
                      m.sender === "user" ? "mr-auto items-start" : "ml-auto items-end"
                    }`}
                  >
                    <div
                      className={`p-3 text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-[#111111] text-white"
                          : "bg-white text-[#111111] border border-[#F1F1F1]"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-neutral-400 mt-1 font-sans">{m.time}</span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="ml-auto flex flex-col items-end max-w-[80%]">
                    <div className="bg-white border border-[#F1F1F1] p-3 text-xs flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Pills */}
              <div className="p-3 bg-white border-t border-[#F1F1F1] flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
                {[
                  "איך מודדים מידה?",
                  "מתי מגיע המשלוח?",
                  "תיאום פגישה ברוטשילד",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuickQuestion(q)}
                    className="flex-shrink-0 px-3 py-1.5 bg-neutral-100 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-[10px] font-medium text-neutral-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Message Inputs */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-white border-t border-[#F1F1F1] flex gap-2"
              >
                <input
                  type="text"
                  placeholder="כתבי הודעה ליועץ הסטודיו..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-[#F9F9F9] focus:bg-white border border-[#F1F1F1] focus:outline-none focus:border-[#D4AF37] px-3.5 py-2.5 text-xs font-light placeholder-neutral-400"
                />
                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-[#111111] px-4.5 py-2.5 transition-colors flex items-center justify-center rounded-none"
                  aria-label="שלח הודעה"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
