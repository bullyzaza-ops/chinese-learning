import { useState, useEffect } from "react";

// ====== DATA ======
const LESSONS = [
  {
    id: 1,
    title: "พินอิน (Pinyin) คืออะไร?",
    emoji: "🔤",
    color: "#E8563A",
    theory: `พินอินคือระบบถอดเสียงภาษาจีนด้วยตัวอักษรโรมัน ใช้เพื่อช่วยในการออกเสียง\n\nภาษาจีนกลางมี 4 วรรณยุกต์ + เสียงเบา:\n• 1st tone (ā) — เสียงสูงยาว เช่น 妈 (mā) = แม่\n• 2nd tone (á) — เสียงขึ้น เช่น 麻 (má) = งา\n• 3rd tone (ǎ) — เสียงลงแล้วขึ้น เช่น 马 (mǎ) = ม้า\n• 4th tone (à) — เสียงลง เช่น 骂 (mà) = ด่า\n• Neutral tone — เสียงเบา เช่น 吗 (ma) = คำถาม`,
    words: [
      { zh: "妈", pinyin: "mā", meaning: "แม่", tone: 1 },
      { zh: "麻", pinyin: "má", meaning: "งา/ชา", tone: 2 },
      { zh: "马", pinyin: "mǎ", meaning: "ม้า", tone: 3 },
      { zh: "骂", pinyin: "mà", meaning: "ด่า", tone: 4 },
    ],
    quiz: [
      { question: "妈 (mā) แปลว่าอะไร?", options: ["ม้า", "แม่", "งา", "ด่า"], answer: 1 },
      { question: "วรรณยุกต์ที่ 3 มีลักษณะเสียงอย่างไร?", options: ["เสียงสูงยาว", "เสียงขึ้น", "เสียงลงแล้วขึ้น", "เสียงลง"], answer: 2 },
      { question: "马 (mǎ) แปลว่าอะไร?", options: ["แม่", "ด่า", "ม้า", "งา"], answer: 2 },
    ]
  },
  {
    id: 2,
    title: "การทักทายพื้นฐาน",
    emoji: "👋",
    color: "#E8A23A",
    theory: `การทักทายเป็นสิ่งแรกที่ต้องเรียน! ในภาษาจีนมีการทักทายที่แตกต่างกันตามสถานการณ์`,
    words: [
      { zh: "你好", pinyin: "nǐ hǎo", meaning: "สวัสดี", tone: 3 },
      { zh: "早上好", pinyin: "zǎo shang hǎo", meaning: "อรุณสวัสดิ์", tone: 3 },
      { zh: "晚上好", pinyin: "wǎn shang hǎo", meaning: "สวัสดีตอนเย็น", tone: 3 },
      { zh: "谢谢", pinyin: "xiè xiè", meaning: "ขอบคุณ", tone: 4 },
      { zh: "对不起", pinyin: "duì bu qǐ", meaning: "ขอโทษ", tone: 4 },
      { zh: "再见", pinyin: "zài jiàn", meaning: "ลาก่อน", tone: 4 },
    ],
    quiz: [
      { question: "\"ขอบคุณ\" ในภาษาจีนคือ?", options: ["你好", "再见", "谢谢", "对不起"], answer: 2 },
      { question: "你好 อ่านว่าอะไร?", options: ["xiè xiè", "nǐ hǎo", "zài jiàn", "duì bu qǐ"], answer: 1 },
      { question: "再见 แปลว่าอะไร?", options: ["สวัสดี", "ขอบคุณ", "ขอโทษ", "ลาก่อน"], answer: 3 },
    ]
  },
  {
    id: 3,
    title: "ตัวเลข 0–10",
    emoji: "🔢",
    color: "#3A9E6A",
    theory: `ตัวเลขในภาษาจีนสำคัญมาก ใช้ในชีวิตประจำวัน เช่น ราคา เบอร์โทร วันที่`,
    words: [
      { zh: "零", pinyin: "líng", meaning: "0" },
      { zh: "一", pinyin: "yī", meaning: "1" },
      { zh: "二", pinyin: "èr", meaning: "2" },
      { zh: "三", pinyin: "sān", meaning: "3" },
      { zh: "四", pinyin: "sì", meaning: "4" },
      { zh: "五", pinyin: "wǔ", meaning: "5" },
      { zh: "六", pinyin: "liù", meaning: "6" },
      { zh: "七", pinyin: "qī", meaning: "7" },
      { zh: "八", pinyin: "bā", meaning: "8" },
      { zh: "九", pinyin: "jiǔ", meaning: "9" },
      { zh: "十", pinyin: "shí", meaning: "10" },
    ],
    quiz: [
      { question: "五 (wǔ) คือเลขอะไร?", options: ["3", "4", "5", "6"], answer: 2 },
      { question: "เลข 8 ในภาษาจีนคือ?", options: ["七", "八", "九", "六"], answer: 1 },
      { question: "十 (shí) คือเลขอะไร?", options: ["7", "8", "9", "10"], answer: 3 },
    ]
  },
  {
    id: 4,
    title: "คำสรรพนาม",
    emoji: "🙋",
    color: "#3A6AE8",
    theory: `คำสรรพนามใช้แทนชื่อบุคคล เป็นพื้นฐานในการสร้างประโยค\n\nเพิ่ม 们 (men) หลังสรรพนามเอกพจน์ เพื่อทำให้เป็นพหูพจน์`,
    words: [
      { zh: "我", pinyin: "wǒ", meaning: "ฉัน/ผม" },
      { zh: "你", pinyin: "nǐ", meaning: "คุณ" },
      { zh: "他", pinyin: "tā", meaning: "เขา (ชาย)" },
      { zh: "她", pinyin: "tā", meaning: "เธอ (หญิง)" },
      { zh: "我们", pinyin: "wǒ men", meaning: "พวกเรา" },
      { zh: "你们", pinyin: "nǐ men", meaning: "พวกคุณ" },
      { zh: "他们", pinyin: "tā men", meaning: "พวกเขา" },
    ],
    quiz: [
      { question: "\"ฉัน\" ในภาษาจีนคือ?", options: ["你", "他", "我", "她"], answer: 2 },
      { question: "我们 แปลว่าอะไร?", options: ["ฉัน", "คุณ", "พวกเขา", "พวกเรา"], answer: 3 },
      { question: "他 กับ 她 ต่างกันอย่างไร?", options: ["ไม่ต่างกัน", "เพศชายกับเพศหญิง", "เอกพจน์กับพหูพจน์", "แปลกต่างกันทั้งหมด"], answer: 1 },
    ]
  },
  {
    id: 5,
    title: "ประโยคพื้นฐาน",
    emoji: "💬",
    color: "#9B3AE8",
    theory: `โครงสร้างประโยคภาษาจีนคล้ายภาษาไทย: ประธาน + กริยา + กรรม\n\nคำถามใช้ 吗 (ma) ต่อท้ายประโยคบอกเล่า\nตอบรับ: 是 (shì) = ใช่ | ตอบปฏิเสธ: 不 (bù) = ไม่`,
    words: [
      { zh: "我是泰国人", pinyin: "wǒ shì tài guó rén", meaning: "ฉันเป็นคนไทย" },
      { zh: "你叫什么名字", pinyin: "nǐ jiào shén me míng zi", meaning: "คุณชื่ออะไร?" },
      { zh: "我叫…", pinyin: "wǒ jiào...", meaning: "ฉันชื่อ..." },
      { zh: "你好吗", pinyin: "nǐ hǎo ma", meaning: "คุณสบายดีไหม?" },
      { zh: "我很好", pinyin: "wǒ hěn hǎo", meaning: "ฉันสบายดีมาก" },
      { zh: "不客气", pinyin: "bù kè qì", meaning: "ไม่เป็นไร (ตอบขอบคุณ)" },
    ],
    quiz: [
      { question: "จะถามว่า \"สบายดีไหม?\" พูดว่า?", options: ["你好", "你好吗", "我很好", "谢谢"], answer: 1 },
      { question: "不 (bù) แปลว่าอะไร?", options: ["ใช่", "ไม่", "มาก", "น้อย"], answer: 1 },
      { question: "จะแนะนำตัวว่า \"ฉันชื่อ...\" พูดว่า?", options: ["我是...", "你叫...", "我叫...", "他叫..."], answer: 2 },
    ]
  }
];

const TONE_COLORS = { 1: "#E8563A", 2: "#E8A23A", 3: "#3A9E6A", 4: "#3A6AE8" };

// ====== COMPONENTS ======

function ProgressBar({ completed, total }) {
  const pct = Math.round((completed / total) * 100);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "#888" }}>
        <span>ความคืบหน้า</span>
        <span>{completed}/{total} บทเรียน ({pct}%)</span>
      </div>
      <div style={{ background: "#F0EDE8", borderRadius: 8, height: 10, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#E8563A,#E8A23A)", borderRadius: 8, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

function WordCard({ word }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        cursor: "pointer", userSelect: "none",
        background: flipped ? "#1A1A2E" : "#fff",
        border: "2px solid #F0EDE8",
        borderRadius: 14, padding: "18px 16px",
        textAlign: "center", transition: "all 0.25s ease",
        minHeight: 90, display: "flex", flexDirection: "column",
        justifyContent: "center", gap: 4, boxShadow: flipped ? "0 4px 20px rgba(0,0,0,0.15)" : "none"
      }}
    >
      {!flipped ? (
        <>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#1A1A2E" }}>{word.zh}</div>
          <div style={{ fontSize: 11, color: "#bbb" }}>แตะเพื่อดูความหมาย</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 18, color: word.tone ? TONE_COLORS[word.tone] : "#E8563A", fontWeight: 600 }}>{word.pinyin}</div>
          <div style={{ fontSize: 15, color: "#fff", marginTop: 4 }}>{word.meaning}</div>
        </>
      )}
    </div>
  );
}

function QuizSection({ quiz, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 < quiz.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  if (done) {
    const passed = score >= Math.ceil(quiz.length * 0.7);
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ fontSize: 52 }}>{passed ? "🎉" : "💪"}</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{score}/{quiz.length} ข้อถูก</div>
        <div style={{ color: "#888", marginTop: 4, marginBottom: 20 }}>{passed ? "ผ่านแล้ว! ยอดเยี่ยมมาก" : "ลองทำใหม่อีกครั้งนะ"}</div>
        {passed ? (
          <button onClick={onComplete} style={{ background: "#E8563A", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            บทเรียนถัดไป →
          </button>
        ) : (
          <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false); }} style={{ background: "#1A1A2E", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            ลองใหม่
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 13, color: "#888" }}>
        <span>ข้อ {current + 1}/{quiz.length}</span>
        <span>✅ {score} ถูก</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 18, lineHeight: 1.5 }}>{q.question}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = "#F8F5F0";
          let color = "#1A1A2E";
          if (selected !== null) {
            if (i === q.answer) { bg = "#3A9E6A"; color = "#fff"; }
            else if (i === selected && selected !== q.answer) { bg = "#E8563A"; color = "#fff"; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{
              background: bg, color, border: "2px solid transparent",
              borderRadius: 10, padding: "12px 8px", fontSize: 15,
              fontWeight: 600, cursor: selected !== null ? "default" : "pointer",
              transition: "all 0.2s", textAlign: "center"
            }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LessonView({ lesson, onBack, onComplete, completed }) {
  const [tab, setTab] = useState("theory");

  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer", marginBottom: 16, padding: 0 }}>← กลับ</button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ background: lesson.color + "22", borderRadius: 12, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{lesson.emoji}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 19 }}>{lesson.title}</div>
          {completed && <div style={{ color: "#3A9E6A", fontSize: 12, fontWeight: 600 }}>✅ ผ่านแล้ว</div>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["theory", "words", "quiz"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "9px 0", borderRadius: 9, border: "none", fontWeight: 700, fontSize: 13,
            background: tab === t ? lesson.color : "#F0EDE8",
            color: tab === t ? "#fff" : "#666", cursor: "pointer", transition: "all 0.2s"
          }}>
            {{ theory: "📖 ทฤษฎี", words: "🃏 คำศัพท์", quiz: "📝 แบบทดสอบ" }[t]}
          </button>
        ))}
      </div>

      {tab === "theory" && (
        <div style={{ background: "#F8F5F0", borderRadius: 14, padding: 20 }}>
          <div style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: 15, color: "#333" }}>{lesson.theory}</div>
          <button onClick={() => setTab("words")} style={{ marginTop: 20, background: lesson.color, color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            เรียนคำศัพท์ →
          </button>
        </div>
      )}

      {tab === "words" && (
        <div>
          <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>แตะที่การ์ดเพื่อดูความหมายและพินอิน</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {lesson.words.map((w, i) => <WordCard key={i} word={w} />)}
          </div>
          <button onClick={() => setTab("quiz")} style={{ width: "100%", background: lesson.color, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            ทำแบบทดสอบ →
          </button>
        </div>
      )}

      {tab === "quiz" && (
        <div style={{ background: "#F8F5F0", borderRadius: 14, padding: 20 }}>
          <QuizSection quiz={lesson.quiz} onComplete={() => { onComplete(lesson.id); onBack(); }} />
        </div>
      )}
    </div>
  );
}

// ====== MAIN APP ======
export default function App() {
  const [completedIds, setCompletedIds] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);

  const markComplete = (id) => {
    setCompletedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  if (activeLesson) {
    return (
      <div style={{ minHeight: "100vh", background: "#FDFAF6", padding: "24px 16px", fontFamily: "'Segoe UI', sans-serif" }}>
        <LessonView
          lesson={activeLesson}
          onBack={() => setActiveLesson(null)}
          onComplete={markComplete}
          completed={completedIds.includes(activeLesson.id)}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FDFAF6", fontFamily: "'Segoe UI', sans-serif", padding: "0 0 40px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)", padding: "32px 20px 28px", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 44, marginBottom: 8 }}>🇨🇳</div>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>เรียนภาษาจีน</div>
        <div style={{ color: "#C8A96E", fontSize: 18, marginTop: 4, fontWeight: 600 }}>从零开始 · เริ่มจาก 0</div>
        <div style={{ color: "#aaa", fontSize: 13, marginTop: 10 }}>สำหรับผู้เริ่มต้น · ครบทุกพื้นฐาน</div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 0" }}>
        <ProgressBar completed={completedIds.length} total={LESSONS.length} />

        {/* Tone legend */}
        <div style={{ background: "#fff", border: "1px solid #F0EDE8", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(TONE_COLORS).map(([t, c]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              <span style={{ fontSize: 12, color: "#555" }}>วรรณยุกต์ {t}</span>
            </div>
          ))}
        </div>

        {/* Lessons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {LESSONS.map((lesson, idx) => {
            const done = completedIds.includes(lesson.id);
            const locked = idx > 0 && !completedIds.includes(LESSONS[idx - 1].id);
            return (
              <button
                key={lesson.id}
                onClick={() => !locked && setActiveLesson(lesson)}
                style={{
                  background: locked ? "#F5F3F0" : "#fff",
                  border: done ? `2px solid ${lesson.color}` : "2px solid #F0EDE8",
                  borderRadius: 16, padding: "16px 18px",
                  display: "flex", alignItems: "center", gap: 14,
                  textAlign: "left", cursor: locked ? "not-allowed" : "pointer",
                  opacity: locked ? 0.55 : 1, transition: "all 0.2s",
                  boxShadow: !locked && !done ? "0 2px 12px rgba(0,0,0,0.05)" : "none"
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: locked ? "#ddd" : lesson.color + "22",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
                }}>
                  {locked ? "🔒" : lesson.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: locked ? "#aaa" : "#1A1A2E" }}>
                    บทที่ {lesson.id}: {lesson.title}
                  </div>
                  <div style={{ fontSize: 12, color: done ? "#3A9E6A" : "#999", marginTop: 3, fontWeight: done ? 700 : 400 }}>
                    {locked ? "ผ่านบทก่อนหน้าก่อน" : done ? "✅ ผ่านแล้ว" : `${lesson.words.length} คำศัพท์ · ${lesson.quiz.length} คำถาม`}
                  </div>
                </div>
                {!locked && (
                  <div style={{ color: lesson.color, fontWeight: 800, fontSize: 18 }}>›</div>
                )}
              </button>
            );
          })}
        </div>

        {completedIds.length === LESSONS.length && (
          <div style={{ marginTop: 24, background: "linear-gradient(135deg,#1A1A2E,#2D1B4E)", borderRadius: 16, padding: "24px 20px", textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>จบหลักสูตรพื้นฐานแล้ว!</div>
            <div style={{ color: "#C8A96E", marginTop: 6, fontSize: 14 }}>厉害了！ (lì hài le) — เก่งมาก!</div>
            <div style={{ color: "#aaa", fontSize: 12, marginTop: 8 }}>ขั้นต่อไป: เรียนตัวอักษรจีน (汉字) และขยายคำศัพท์</div>
          </div>
        )}
      </div>
    </div>
  );
}
