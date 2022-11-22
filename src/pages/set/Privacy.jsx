import React, { useState, useEffect, useRef } from "react";
import { recoilPersist } from "recoil-persist";
import "./Privacy.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const [lonned, setLonned] = useState(false);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const check = sessionStorage.getItem("logined") || false;
  useEffect(() => {
    if (check) {
      setLonned(sessionStorage.getItem("user"));
      setUserId(sessionStorage.getItem("userid"));
    }
  }, []);

  return (
    <div className="Privacy">
      <div className="top">
        <h1>회원 정보 수정 / 회원 탈퇴</h1>
        <h2></h2>
        <h3>고객님께서 가입하신 회원정보입니다.</h3>
        <h3>안전한 정보 변경을 위하여 정확한 정보 입력부탁드립니다.</h3>
        <h3>
          회원 정보 변경시 변경 하기 버튼을 클릭 하세요.
          <button className="Privacybutton"> 수정하기 </button>
        </h3>
        <h3>
          회원 탈퇴 시 회원 탈퇴 버튼을 클릭 하세요.
          <button className="Privacybutton1"> 회원탈퇴 </button>
        </h3>
      </div>

      <div className="botton">
        <div className="right">
          <div className="bottonMain">회원 정보 변경</div>
          <h2></h2>
          <form>
            <div className="formInput">
              <label htmlFor="">이름</label>
              <div className="name">{check}</div>
            </div>

            <div className="formInput">
              <label className="formInputsd2">아이디</label>
              <div>{userId}</div>
            </div>
            <div className="formInput">
              <label htmlFor="">비밀번호 (현재)</label>
              <input
                type="password"
                vlaue={password}
                placeholder="비밀번호 입력하세요"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <h4>현재 비빌번호를 입력해주세요.</h4>
            </div>

            <div className="formInput">
              <label htmlFor="">비밀번호 (변경)</label>
              <input
                type="password"
                vlaue={password}
                placeholder="비밀번호 입력하세요"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <h4>변경할 비밀번호를 입력해주세요</h4>
            </div>
            <div className="formInput">
              <label htmlFor="">비밀번호 (변경)</label>
              <input
                type="password"
                placeholder="비밀번호"
                vlaue={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <h4>비밀번호를 확인하십세오</h4>
            </div>
          </form>
          <div className="buttonDiv">
            <button
              type="reset"
              onClick={async () => {
                const lonned = await axios({
                  url: "http://localhost:7999/account/pwReset",
                  method: "patch",
                  data: { userId, userName, password, confirmPassword },
                });

                if (lonned.data == true) {
                  setLonned(lonned.data);
                  console.log(lonned.data);

                  alert("비밀번호 변경완료");
                  setLonned(false);
                  sessionStorage.clear();

                  navigate("/");
                  window.location.reload();
                } else if (lonned.data == false) {
                  setLonned(lonned.data);
                  alert("비밀번호를 확인해주세요");
                }
              }}>
              수정하기
            </button>
            <button className="buttonDivsds2">회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
