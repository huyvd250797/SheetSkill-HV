'use client';
import {useEffect,useMemo,useState} from 'react';
import {baseRows,demoSteps,Platform,Stage,stages} from '@/lib/lesson';
const cols=['A','B','C','D'];
const headers=['Nhân viên','Tháng 1','Tháng 2','Tổng'];
export default function LearningApp(){
 const [platform,setPlatform]=useState<Platform>('excel'); const [stage,setStage]=useState<Stage>('learn');
 const [step,setStep]=useState(0); const [playing,setPlaying]=useState(false); const [selected,setSelected]=useState('');
 const [formula,setFormula]=useState(''); const [rows,setRows]=useState(baseRows.map(r=>[...r])); const [message,setMessage]=useState('');
 const [mastery,setMastery]=useState(20); const active=demoSteps[step];
 useEffect(()=>{if(stage!=='demo'||!playing)return; const t=setTimeout(()=>{if(step<demoSteps.length-1)setStep(s=>s+1);else setPlaying(false)},1500);return()=>clearTimeout(t)},[stage,playing,step]);
 useEffect(()=>{if(stage==='demo'){setFormula(active.formula||''); if(active.result){setRows(r=>r.map((x,i)=>i===0?[...x.slice(0,3),active.result!]:x))}}},[stage,step,active]);
 const progress=useMemo(()=>({learn:20,demo:40,tutorial:60,practice:80,check:100}[stage]),[stage]);
 function go(s:Stage){setStage(s);setMessage('');setSelected('');setFormula('');setRows(baseRows.map(r=>[...r])); if(s==='demo')setStep(0)}
 function select(cell:string){setSelected(cell); if(stage==='tutorial'){if(cell==='D2')setMessage('✓ Đúng ô. Bây giờ nhập =SUM(B2:C2)');else setMessage('Gợi ý: kết quả cần nằm ở cột Tổng, dòng của An.')}}
 function submit(){const normalized=formula.replace(/\s/g,'').toUpperCase(); const ok=normalized==='=SUM(B2:C2)'; if(ok){setRows(r=>r.map((x,i)=>i===0?[...x.slice(0,3),'270']:x));setMessage('✓ Chính xác! SUM(B2:C2) = 270.');setMastery(stage==='check'?100:Math.max(mastery,65));}else setMessage(stage==='check'?'Chưa đúng. Hãy thử lại.':'Chưa đúng. Hint: dùng SUM với vùng từ B2 đến C2.');}
 return <main className="shell">
  <aside className="sidebar"><div className="brand"><span className="logo">S</span><div><b>SheetPath</b><small>Excel + Google Sheets</small></div></div>
   <div className="pathTitle">LỘ TRÌNH CỦA BẠN</div><div className="level active"><b>L2 · Hàm thiết yếu</b><span>3 / 12 kỹ năng</span></div>
   {['SUM · Tính tổng','AVERAGE · Trung bình','COUNT · Đếm dữ liệu','IF · Điều kiện','SUMIF · Tổng có điều kiện'].map((x,i)=><div key={x} className={'skill '+(i===0?'current':i<0?'done':'')}><span>{i===0?'▶':'○'}</span>{x}</div>)}
   <div className="mastery"><div><b>Mastery</b><b>{mastery}%</b></div><div className="bar"><i style={{width:`${mastery}%`}}/></div><small>Hoàn thành Skill Check để xác nhận kỹ năng.</small></div>
  </aside>
  <section className="content">
   <header><div><div className="crumb">L2 / Hàm thiết yếu / SUM</div><h1>SUM — Tính tổng nhanh</h1></div><div className="platform"><button className={platform==='excel'?'on':''} onClick={()=>setPlatform('excel')}>▦ Excel</button><button className={platform==='sheets'?'on':''} onClick={()=>setPlatform('sheets')}>▦ Google Sheets</button></div></header>
   <div className="stagebar">{stages.map(([s,l],i)=><button key={s} className={stage===s?'active':''} onClick={()=>go(s)}><span>{stage===s?i+1:i+1}</span>{l}</button>)}<div className="stageProgress"><i style={{width:`${progress}%`}}/></div></div>
   <div className="workspace">
    <div className="lessonPane">
     {stage==='learn'&&<><span className="eyebrow">KHÁI NIỆM</span><h2>SUM dùng để làm gì?</h2><p>Hàm <code>SUM</code> cộng nhanh các số trong một hoặc nhiều ô. Thay vì viết <code>=B2+C2</code>, bạn có thể dùng một vùng.</p><div className="formulaCard">=SUM(B2:C2)<div><b>SUM</b><span>hàm tính tổng</span><b>B2:C2</b><span>vùng cần cộng</span></div></div><div className="tip">💡 <b>Dấu hai chấm (:)</b> có nghĩa là “từ ô đầu đến ô cuối”.</div><button className="primary" onClick={()=>go('demo')}>Xem demo từng bước →</button></>}
     {stage==='demo'&&<><span className="eyebrow">ANIMATED DEMO · {step+1}/{demoSteps.length}</span><h2>{active.title}</h2><p>{active.caption}</p><div className="stepDots">{demoSteps.map((_,i)=><i key={i} className={i<=step?'done':''}/>)}</div><div className="controls"><button onClick={()=>setStep(Math.max(0,step-1))}>←</button><button className="primary" onClick={()=>setPlaying(!playing)}>{playing?'Ⅱ Tạm dừng':'▶ Phát'}</button><button onClick={()=>setStep(Math.min(demoSteps.length-1,step+1))}>→</button></div>{step===demoSteps.length-1&&<button className="primary wide" onClick={()=>go('tutorial')}>Bây giờ tôi tự làm →</button>}</>}
     {stage==='tutorial'&&<><span className="eyebrow">LÀM THEO · CÓ HƯỚNG DẪN</span><h2>Đến lượt bạn</h2><p>Hãy tính tổng doanh thu của <b>An</b>.</p><ol className="tasks"><li className={selected==='D2'?'done':''}>Chọn ô D2</li><li>Nhập <code>=SUM(B2:C2)</code></li><li>Kiểm tra kết quả</li></ol><div className="tip">{message||'👆 Hãy bắt đầu bằng cách chọn ô cần đặt kết quả.'}</div><button className="primary" onClick={()=>go('practice')}>Sang luyện tập →</button></>}
     {stage==='practice'&&<><span className="eyebrow">GUIDED PRACTICE</span><h2>Tự viết công thức</h2><p>Tính tổng doanh thu của An tại ô D2. Bạn vẫn có thể nhận hint nếu cần.</p><div className="tip">{message||'Chọn D2 và nhập công thức vào Formula Bar.'}</div><button className="primary" onClick={()=>go('check')}>Tôi sẵn sàng kiểm tra →</button></>}
     {stage==='check'&&<><span className="eyebrow">SKILL CHECK</span><h2>Kiểm tra kỹ năng SUM</h2><p>Không có hint trong phần này. Tính tổng B2:C2 tại D2.</p><div className={message.startsWith('✓')?'success':'tip'}>{message||'Hoàn thành nhiệm vụ trên bảng tính rồi bấm Chấm bài.'}</div><button className="primary" onClick={submit}>Chấm bài</button>{mastery===100&&<div className="badge">★ SUM MASTERED</div>}</>}
    </div>
    <div className={'sheet '+platform}>
      <div className="sheetTop"><span>{platform==='excel'?'Microsoft Excel mode':'Google Sheets mode'}</span><span>Lesson workbook · SUM</span></div>
      <div className="formulaBar"><b>fx</b><input aria-label="Formula" value={formula} onChange={e=>setFormula(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')submit()}} placeholder="Chọn D2 rồi nhập công thức…"/></div>
      <table><thead><tr><th></th>{cols.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody><tr><th>1</th>{headers.map((h,i)=><td key={h} className="head">{h}</td>)}</tr>{rows.map((r,ri)=><tr key={ri}><th>{ri+2}</th>{r.map((v,ci)=>{const cell=cols[ci]+(ri+2); const hi=stage==='demo'&&(active.cell===cell||(active.cell==='B2:C2'&&(cell==='B2'||cell==='C2')));return <td key={cell} onClick={()=>select(cell)} className={(selected===cell?'selected ':'')+(hi?'highlight ':'')}>{cell==='D2'&&formula&&!rows[0][3]?<span className="typing">{formula}</span>:v}</td>})}</tr>)}</tbody></table>
      <div className="sheetFooter"><span>＋</span><b>Sheet1</b><span>100%</span></div>
    </div>
   </div>
  </section>
 </main>
}
