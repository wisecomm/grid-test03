SHADCN UI 새믚 -> Tasks 그리드 샘픔

- 그리드 페이지 처리 사항
  : data-table-toolbar.tsx 수정 - 테이블 검색 추가 및 찾기 기능 추가

# 그리드 테스트 사항

??? 서버사이드 옵션으로 빼고 샘플 작성
??? 타이틀 , 내용 중앙정렬 확인 (외부에서 하는 방법으로 )

- [ ] 싱글선택, 멀티 선택 테스트

- page-dt-toolbar.tsx : 검색 버턴 클릭 시 메인 조회, 찾기 입력후 엔터시도 메인 조회

- 페이지 이벤트 처리 : 서버 처리 시
  manualPagination: true,
  console.log("aaa=" + table.options.enableRowSelection);
  console.log("aaa=" + table.options.manualPagination);

# 참조 사이트

- Tanstack-table pagination server-side로 구현하기  
  https://geuni620.github.io/blog/2024/6/7/tanstack-table-server-side/

- Server Side Pagination, Column Filtering and Sorting With TanStack Table and Query Library  
  https://medium.com/@clee080/how-to-do-server-side-pagination-column-filtering-and-sorting-with-tanstack-react-table-and-react-7400a5604ff2
- git
  https://github.com/sadmann7/shadcn-table
