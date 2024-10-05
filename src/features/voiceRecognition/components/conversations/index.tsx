import { text } from "stream/consumers";
import { Conversation } from "../../types/conversation";

type Props = {
  data: Array<Conversation>
}

export const Conversations = (props: Props) => {

  const { data } = props;

  console.log(data);
  

  return (
    <>
      {data.map((item) => {
        return(
          <p key={item.id}>{ item.text }</p>
        )
      })}
    </>
  )
}

export default Conversations