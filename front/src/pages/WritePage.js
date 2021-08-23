import Responsive from "../components/common/Responsive";
import WriteEditor from "../components/write/Editor";
import WriteActionButtons from "../components/write/WriteActionButtonsBlock";

const WritePage = () => {
	return (
		<Responsive>
			<WriteEditor />
			<WriteActionButtons />
		</Responsive>
	)
}

export default WritePage;
