type Props = {
  data: Array<string>
}

export const Conversations = (props: Props) => {

  const { data } = props;

  return (
    <>
      {data.map((item, index) => {
        return(
          <p key={index}>{ item }</p>
        )
      })}
    </>
  )
}

export default Conversations