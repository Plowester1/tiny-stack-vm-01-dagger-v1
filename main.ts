import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
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
const im=k>=64?4:k>=32?2:k>=16?1:0,ps=k>>2&3,qs=k&3;
if(pc+im>=n)return bad(9);
st++;
if(s<ps)return bad(2);
if(s-ps+qs>256)return bad(3);
const nx=pc+1+im;
pc=nx;
switch(op){
case 0:return bad(0);
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const t=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=t;break}
case 16:case 17:case 18:case 19:case 20:case 21:case 22:
case 24:case 25:case 26:case 28:case 29:case 30:
case 32:case 33:case 34:{
const b=D[s-1],a=D[s-2];let r;
if(op>=19&&op<=22&&!b)return bad(4);
switch(op){
case 16:r=(a+b)|0;break;
case 17:r=(a-b)|0;break;
case 18:r=Math.imul(a,b);break;
case 19:r=a===-2147483648&&b===-1?a:(a/b)|0;break;
case 20:r=b===-1?0:a%b|0;break;
case 21:r=(a>>>0)/(b>>>0)|0;break;
case 22:r=(a>>>0)%(b>>>0)|0;break;
case 24:r=a&b;break;
case 25:r=a|b;break;
case 26:r=a^b;break;
case 28:r=a<<(b&31);break;
case 29:r=a>>(b&31);break;
case 30:r=(a>>>(b&31))|0;break;
case 32:r=a===b?1:0;break;
case 33:r=a<b?1:0;break;
case 34:r=(a>>>0)<(b>>>0)?1:0;break;
}
s-=2;D[s++]=r;break;
}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
const take=op===48||(op===49?D[--s]===0:D[--s]!==0);
if(take)pc=nx+rel;break;
}
case 51:if(c===64)return bad(7);C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 52:if(!c)return bad(8);pc=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return bad(6);D[s-1]=M[a];break}
case 65:{const a=D[s-1];if(a<0||a>255)return bad(6);M[a]=D[s-2];s-=2;break}
case 80:{const z=''+D[s-1];if(o.length+z.length>65536)return bad(11);s--;for(const x of z)o.push(x.charCodeAt());break}
case 81:if(o.length+1>65536)return bad(11);o.push(D[--s]&255);break;
case 82:D[s++]=ip<i.length?i[ip++]:-1;break;
case 83:return{out:o,code:D[--s]&255};
default:return bad(5);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const r=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),Uint8Array.from(r.out));
writeFileSync(join(O,id,'exit.txt'),`${r.code}\n`);
}
