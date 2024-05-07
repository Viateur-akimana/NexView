import type { Photo } from "../api/Image";
import  Image from "next/image"

type Props = {
    photo:Photo
}
export default function ImageContainer({photo}:Props){
    return(
        <div key={photo.id} className='h-64 bg-gray rounded-xl relative overflow-hidden group'>
            <Image
            src={photo.src.large}
            alt={photo.alt}
            width={250}
            height={250}
            fill={true}
            className="object-cover group-hover:opacity-75"
            />
        </div>
    )
}
