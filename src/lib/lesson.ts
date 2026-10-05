export type Platform='excel'|'sheets';
export type Stage='learn'|'demo'|'tutorial'|'practice'|'check';
export type Cell={value:string; formula?:string};
export const stages:[Stage,string][]=[['learn','Học'],['demo','Demo'],['tutorial','Làm theo'],['practice','Luyện tập'],['check','Kiểm tra']];
export const demoSteps=[
 {title:'Chọn ô D2',caption:'Kết quả tổng doanh thu sẽ được đặt tại D2.',cell:'D2'},
 {title:'Bắt đầu công thức',caption:'Mọi công thức bắt đầu bằng dấu =.',cell:'D2',formula:'='},
 {title:'Dùng hàm SUM',caption:'SUM cộng tất cả giá trị trong một vùng.',cell:'D2',formula:'=SUM('},
 {title:'Chọn vùng B2:C2',caption:'B2:C2 chứa doanh thu tháng 1 và tháng 2.',cell:'B2:C2',formula:'=SUM(B2:C2)'},
 {title:'Nhấn Enter',caption:'Excel/Google Sheets tính kết quả: 270.',cell:'D2',formula:'=SUM(B2:C2)',result:'270'}
];
export const baseRows=[['An','120','150',''],['Bình','100','210',''],['Chi','180','160','']];
