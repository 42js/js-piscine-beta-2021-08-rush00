import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from "../../modules/user";

const LoginForm = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
		form: auth.login,
		auth: auth.auth,
		authError: auth.authError,
		user: user.user,
	}));

	const onChange = e => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'login',
				key: name,
				value,
			})
		);
	};

	const onSubmit = e => {
		e.preventDefault();
		const { username, password } = form;
		dispatch(login({ username, password }));
	};

	useEffect(() => {
		dispatch(initializeForm('login'));
	}, [dispatch]);

	useEffect(() => {
		if (authError) {
			if (authError.response.status === 400) {
				dispatch(initializeForm('login'));
				setError('유효하지 않은 아이디나 비밀번호입니다');
				return ;
			}
			else if (authError.response.status === 401) {
				dispatch(initializeForm('login'));
				setError('아이디나 비밀번호가 존재하지 않습니다');
				return ;
			}
			else if (authError.response.status === 409) {
				dispatch(initializeForm('login'));
				setError('이미 로그인 중인 아이디입니다');
				return ;
			}
			else if (authError.response.status === 500) {
				dispatch(initializeForm('login'));
				setError('네트워크 연결을 확인하세요');
				return ;
			}
			setError('로그인 실패');
			return ;
		}
		if (auth) {
			console.log('로그인 성공');
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if (user) {
			history.push('/');
			try {
				localStorage.setItem('user', JSON.stringify(user));
			} catch (e) {
				console.log('localStorage is not working');
			}
		}
	}, [history, user]);

	return (
		<AuthForm
			type="login"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			error={error}
		/>
	);
};

export default withRouter(LoginForm);
