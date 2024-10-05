export const charStringAnimation = (data: any, index: number, length: number) => {
  const i = index;
  return(
    data.map((item: string, index: number) => 
      <span key={index} style={(length - 1 === i) ? { animation: `fadeIn 0.1s ease ${index * 0.05}s forwards`, opacity: 0 } : {}}>{item}</span>
    )
  )
}
