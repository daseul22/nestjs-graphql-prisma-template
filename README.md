# 트러블 슈팅 메모

## OAuth login 인증 후 register 플로우 고민

- 로그인 플로우 때 DB email 만 식별용으로 저장, registerStatus, expiry_date, 식별용 데이터로 일정기간 이상 등록 안하면 batch로 정보 삭제
- jwt에 registerStatus 저장해서 보내면 어떨까? registerJwt 라고 하나 만들어서 includeEmail이 아닐 떄도 jwt보내는 거임 <br>
  로그인을 시도했을 때 JWT가 없을 수가 없음.<br>
  클라이언트에서 registerStatus false받으면 바로 register단계로 이동하고 유저가 전부 입력하면 서버로 등록 요청 <br>
  서버에서는 registerToken 검증하고 register false면 유저 정보 등록 후 유저 정보 return <br>
  만약 검증 실패하면 Invalid RegisterToken, 없으면 Not Existed RegisterToken <br>
  그냥 이렇게 하지 말고, email 만 registerToken에 넣고 토큰 유효 검사하는 플로우만 같고, <br>
  나머지는 email mismatch랑 db에 email존재하는지 체크한 후 유저 등록하는걸로 유저 등록 완료하면 clearCookie 하면됨.
