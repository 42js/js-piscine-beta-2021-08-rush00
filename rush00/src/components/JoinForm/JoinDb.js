import axios from "axios";

const JoinDb = async (props) => {
  const [email, passwd, nickname] = props;
  console.log(
    JSON.stringify({
      username: nickname,
      email: email,
      password: passwd,
    })
  );
  await axios
    .post("http://localhost:4242/auth/signup", {
      username: nickname,
      email: email,
      password: passwd,
    })
    .then((response) => {
      console.log("res: ", response);
      alert(`${email} 님 회원가입을 축하드립니다 :)`);
    })
    .catch((e) => alert(e));
};

export default JoinDb;
