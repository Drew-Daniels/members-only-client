export default function BaseButton({ type='submit', text = 'Submit' }) {
  return <button type={type} className='bg-[#fc5f0a] py-2 px-4 my-2 rounded inline-flex items-center text-white'>{text}</button>
}