import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const K='0Aq46:;?!!!!!!!!999999959995999!999!!!!!!!!!!!!!PTTP0!!!!!!!!!!!58!!!!!!!!!!!!!!4414';

function run(p,i){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
 let s=0,c=0,pc=0,ip=0,st=0;
 const bad=x=>({out:o,code:x});
 for(;;){
  if(st===1e6)return bad(10);
  if(pc<0||pc>=n)return bad(9);
  const op=p[pc],k=K.charCodeAt(op)-48;
  if(!(k>=0))return bad(5);
  const im=k>=64?4:k>=32?2:k>=16?1:0,ps=Math.floor(k/4)%4,qs=k%4;
  if(pc+im>=n)return bad(9);
  st++;
  if(s<ps)return bad(2);
  if(s-ps+qs>256)return bad(3);
  const nx=pc+1+im;
  pc=nx;
  switch(op){
  case 0:return{out:o,code:0};
  case 1:D[s++]=(p[nx-1]<<24)>>24;break;
  case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
  case 3:s--;break;
  case 4:D[s]=D[s-1];s++;break;
  case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break}
  case 6:D[s]=D[s-2];s++;break;
  case 7:{const t=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=t;break}
  case 0x10:case 0x11:case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:
  case 0x18:case 0x19:case 0x1a:case 0x1c:case 0x1d:case 0x1e:
  case 0x20:case 0x21:case 0x22:{
   const b=D[s-1],a=D[s-2];let r;
   switch(op){
   case 0x10:r=(a+b)|0;break;
   case 0x11:r=(a-b)|0;break;
   case 0x12:r=Math.imul(a,b);break;
   case 0x13:if(!b)return bad(4);r=a===-2147483648&&b===-1?a:(a/b)|0;break;
   case 0x14:if(!b)return bad(4);r=b===-1?0:a%b|0;break;
   case 0x15:if(!b)return bad(4);r=Math.floor((a>>>0)/(b>>>0))|0;break;
   case 0x16:if(!b)return bad(4);r=(a>>>0)%(b>>>0)|0;break;
   case 0x18:r=a&b;break;
   case 0x19:r=a|b;break;
   case 0x1a:r=a^b;break;
   case 0x1c:r=a<<(b&31);break;
   case 0x1d:r=a>>(b&31);break;
   case 0x1e:r=(a>>>(b&31))|0;break;
   case 0x20:r=a===b?1:0;break;
   case 0x21:r=a<b?1:0;break;
   case 0x22:r=(a>>>0)<(b>>>0)?1:0;break;
   }
   s-=2;D[s++]=r;break;
  }
  case 0x17:D[s-1]=-D[s-1]|0;break;
  case 0x1b:D[s-1]=~D[s-1];break;
  case 0x30:case 0x31:case 0x32:{
   const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
   const take=op===0x30||(op===0x31?D[--s]===0:D[--s]!==0);
   if(take)pc=nx+rel;break;
  }
  case 0x33:if(c===64)return bad(7);C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
  case 0x34:if(!c)return bad(8);pc=C[--c];break;
  case 0x40:{const a=D[s-1];if(a<0||a>255)return bad(6);D[s-1]=M[a];break}
  case 0x41:{const a=D[s-1];if(a<0||a>255)return bad(6);M[a]=D[s-2];s-=2;break}
  case 0x50:{const z=''+D[s-1];if(o.length+z.length>65536)return bad(11);s--;for(let j=0;j<z.length;j++)o.push(z.charCodeAt(j));break}
  case 0x51:if(o.length+1>65536)return bad(11);o.push(D[--s]&255);break;
  case 0x52:D[s++]=ip<i.length?i[ip++]:-1;break;
  case 0x53:return{out:o,code:D[--s]&255};
  default:return bad(5);
  }
 }
}

const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
 const r=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),Uint8Array.from(r.out));
 writeFileSync(join(O,id,'exit.txt'),`${r.code}\n`);
}
