import { useEffect, useState } from 'react'
import { auth, db, storage, serverTimestamp } from './firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export default function Admin(){
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('Balcony')
  const [file, setFile] = useState(null)
  const [items, setItems] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=> setUser(u))
    return ()=>unsub()
  },[])

  useEffect(()=>{
    if(user){ loadGallery() }
  },[user])

  const login = async (e)=>{
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth, email, password)
    }catch(err){ alert(err.message) }
  }
  const logout = ()=> signOut(auth)

  const loadGallery = async ()=>{
    const q = query(collection(db,'gallery'), orderBy('createdAt','desc'))
    const snap = await getDocs(q)
    setItems(snap.docs.map(d=>({ id:d.id, ...d.data() })))
  }

  const upload = async (e)=>{
    e.preventDefault()
    if(!file) return alert('Choose an image')
    setBusy(true)
  }

  const handleUpload = async (e)=>{
    e.preventDefault()
    if(!file) return alert('Choose an image')
    setBusy(true)
    try{
      // 1) Upload to Storage
      const id = `${Date.now()}_${file.name}`
      const storageRef = ref(storage, `gallery/${id}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      // 2) Save to Firestore
      await addDoc(collection(db,'gallery'), {
        title, description: desc, category, url,
        createdAt: serverTimestamp()
      })

      setTitle(''); setDesc(''); setCategory('Balcony'); setFile(null)
      await loadGallery()
      alert('Uploaded')
    }catch(err){
      console.error(err); alert(err.message)
    }finally{
      setBusy(false)
    }
  }

  const remove = async (item)=>{
    if(!confirm('Delete this item?')) return
    // Try delete storage by parsing path from URL (best to store path; here we attempt simple delete)
    try{
      const url = new URL(item.url)
      const pathMatch = decodeURIComponent(url.pathname).match(/\/o\/(.+)$/) // gs path not guaranteed
      if(pathMatch){
        const storageRef = ref(storage, pathMatch[1])
        await deleteObject(storageRef).catch(()=>{})
      }
    }catch{}
    await deleteDoc(doc(db,'gallery', item.id))
    await loadGallery()
  }

  if(!user){
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <form onSubmit={login} className="w-full max-w-sm space-y-3 border border-zinc-700 rounded-2xl p-6 bg-zinc-900/70">
          <div className="text-xl font-semibold">Admin Login</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"/>
          <button className="w-full px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500">{'Login'}</button>
          <div className="text-xs text-zinc-400">Create user in Firebase → Authentication → Users</div>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 backdrop-blur border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-teal-400">HSF Admin</div>
        <button onClick={logout} className="text-sm px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">Logout</button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-4 border border-zinc-700 rounded-2xl p-5 bg-zinc-900/70">
          <div className="md:col-span-2 text-lg font-medium">Upload to Gallery</div>
          <div>
            <label className="text-sm text-zinc-400">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"/>
          </div>
          <div>
            <label className="text-sm text-zinc-400">Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2">
              {['Balcony','Gate','Grill','Stairs','Other'].map(c=>(<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-zinc-400">Description</label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows="3" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2"></textarea>
          </div>
          <div className="md:col-span-2">
            <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full text-sm"/>
          </div>
          <div className="md:col-span-2">
            <button disabled={busy} className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50">{busy?'Uploading...':'Upload'}</button>
          </div>
        </form>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {items.map(item=>(
            <div key={item.id} className="border border-zinc-700 rounded-2xl overflow-hidden bg-zinc-900/60">
              <img src={item.url} alt={item.title} className="w-full h-48 object-cover"/>
              <div className="p-3">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-zinc-400">{item.category}</div>
                <div className="text-xs text-zinc-500 mt-1">{item.description}</div>
                <button onClick={()=>remove(item)} className="mt-3 text-sm px-3 py-1 rounded-xl bg-red-600/80 hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
