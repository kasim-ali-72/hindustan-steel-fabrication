import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

// Seed images from Google Drive (converted to direct links)
const seedImages = [
  { url: 'https://drive.google.com/uc?export=view&id=18sDmbLoVPonBBXhmvmxHX-K7XOyVFWcW', title: 'Balcony' },
  { url: 'https://drive.google.com/uc?export=view&id=1v-kiofqZErcDlDu-qYb66O5TPK8175YJ', title: 'SS Gate' },
  { url: 'https://drive.google.com/uc?export=view&id=1snThKIgBiR9qoERRANJTYaBV-VQdD8YA', title: 'SS Grill' },
  { url: 'https://drive.google.com/uc?export=view&id=1N6Y_07b2ROwDYBi5D6m--QnQJhDWGGit', title: 'SS Stairs' },
]

export default function GalleryCarousel(){
  const [items, setItems] = useState(seedImages)

  useEffect(()=>{
    (async ()=>{
      try{
        const q = query(collection(db,'gallery'), orderBy('createdAt','desc'))
        const snap = await getDocs(q)
        const cloud = snap.docs.map(d=>({ id: d.id, ...d.data() }))
        if (cloud.length) setItems(prev => [...cloud, ...prev]) // new first, then seeds
      }catch(e){ console.error('Gallery load error', e) }
    })()
  },[])

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ]
  }

  return (
    <Slider {...settings}>
      {items.map((it, idx)=>(
        <div key={it.id || idx}>
          <div className="rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900/60">
            <img src={it.url} alt={it.title || 'Gallery'} className="w-full h-64 object-cover" />
            <div className="p-3 text-sm text-zinc-300">{it.title || '—'}</div>
          </div>
        </div>
      ))}
    </Slider>
  )
}
