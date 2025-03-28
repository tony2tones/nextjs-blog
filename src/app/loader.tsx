import LoaderSVG from '../../public/loader.svg'
import Image from 'next/image';

export default function Loader() {
  return (
    <Image src={LoaderSVG} alt="Loading..." width={100} height={100} />

  )
}