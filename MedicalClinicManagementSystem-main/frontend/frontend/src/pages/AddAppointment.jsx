import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function AddAppointment() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [form, setForm] = useState({
        doctor: "",
        date: "",
        reason: ""
    })

    useEffect(() => {
        const fetchDoctor = async () => {
            setIsLoadingDoctors(true)
            try {
                const res = await fetch("https://medicalclinicmanagementsystem.onrender.com/doctors/allDoctors")
                const data = await res.json()
                if (res.ok) {
                    setDoctor(data)
                } else {
                    setMessage({ type: 'error', text: 'Failed to load doctors' })
                }
            } catch (error) {
                setMessage({ type: 'error', text: 'Error loading doctors' })
            } finally {
                setIsLoadingDoctors(false)
            }
        }
        fetchDoctor()
    }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!user) {
            setMessage({ type: 'error', text: 'You need to login to book an appointment' })
            setTimeout(() => navigate('/login'), 1500)
            return
        }

        setIsLoading(true)
        setMessage({ type: '', text: '' })

        const token = localStorage.getItem("token")
        
        try {
            const res = await fetch("https://medicalclinicmanagementsystem.onrender.com/appointments/createAppointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            
            if (res.ok) {
                setMessage({ type: 'success', text: 'Appointment booked successfully!' })
                setForm({ doctor: "", date: "", reason: "" })
                setTimeout(() => {
                    navigate('/my-appointments')
                }, 2000)
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to book appointment' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error connecting to server' })
        } finally {
            setIsLoading(false)
        }
    }

    // حساب تاريخ اليوم وغداً
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

    const getDoctorImage = (doctorId) => {
        const selectedDoctor = doctor.find(d => d._id === doctorId)
        if (!selectedDoctor) return null
        
        if (selectedDoctor?.image && !selectedDoctor.image.startsWith('doctor')) {
            return `https://medicalclinicmanagementsystem.onrender.com/uploads/${selectedDoctor.image}`
        }
        
        return 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }

    return (
        <section className='relative min-h-screen overflow-hidden bg-blue-50 py-8 px-4 sm:px-6 lg:px-8'>
            {/* خلفية متدرجة مع تأثيرات */}
            <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 z-0'></div>
            
            {/* تأثيرات الخلفية الجمالية */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
            <div className='absolute top-0 right-0 w-72 h-72 bg-[#0097a5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
            <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
            
            {/* نقاط زخرفية */}
            <div className='absolute top-10 left-10 w-6 h-6 bg-[#0097a5] rounded-full opacity-10'></div>
            <div className='absolute bottom-10 right-10 w-10 h-10 bg-blue-300 rounded-full opacity-10'></div>
            <div className='absolute top-1/2 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-20'></div>
            
            {/* محتوى الصفحة */}
            <div className='relative z-10 max-w-4xl mx-auto'>
                {/* العنوان الرئيسي */}
                <div className='text-center mb-10'>
                    <div className='inline-block relative'>
                        <h2 className='text-3xl md:text-4xl font-bold text-[#0097a5] mb-4 relative z-10'>
                            Book <span className='text-blue-800'>Appointment</span>
                        </h2>
                        <div className='absolute -bottom-2 left-1/4 w-1/2 h-2 bg-blue-100 rounded-full z-0'></div>
                    </div>
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mb-6 rounded-full'></div>
                    <p className='text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm'>
                        Schedule your medical consultation with our expert doctors
                    </p>
                </div>

                <div className='grid lg:grid-cols-3 gap-8'>
                    {/* معلومات الحجز */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-6 sticky top-8'>
                            <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center'>
                                <i className="fas fa-info-circle text-[#0097a5] mr-3"></i>
                                Booking Information
                            </h3>
                            
                            <div className='space-y-4'>
                                <div className='bg-gradient-to-br from-blue-50/80 to-white/80 p-4 rounded-xl border border-blue-100/50'>
                                    <div className='flex items-center mb-2'>
                                        <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
                                            <i className="fas fa-clock text-[#0097a5]"></i>
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-gray-800'>Clinic Hours</h4>
                                            <p className='text-sm text-gray-600'>9:00 AM - 8:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-gradient-to-br from-emerald-50/80 to-white/80 p-4 rounded-xl border border-green-100/50'>
                                    <div className='flex items-center mb-2'>
                                        <div className='w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3'>
                                            <i className="fas fa-calendar-check text-emerald-600"></i>
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-gray-800'>Same Day Appointments</h4>
                                            <p className='text-sm text-gray-600'>Available if booked before 4:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-gradient-to-br from-amber-50/80 to-white/80 p-4 rounded-xl border border-amber-100/50'>
                                    <div className='flex items-center mb-2'>
                                        <div className='w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3'>
                                            <i className="fas fa-phone-alt text-amber-600"></i>
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-gray-800'>Emergency Contact</h4>
                                            <p className='text-sm text-gray-600'>+1 234 567 8900</p>
                                        </div>
                                    </div>
                                </div>

                                {form.doctor && (
                                    <div className='bg-gradient-to-br from-purple-50/80 to-white/80 p-4 rounded-xl border border-purple-100/50'>
                                        <div className='flex items-center mb-3'>
                                            <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3'>
                                                <i className="fas fa-user-md text-purple-600"></i>
                                            </div>
                                            <div>
                                                <h4 className='font-bold text-gray-800'>Selected Doctor</h4>
                                                <p className='text-sm text-gray-600'>
                                                    {doctor.find(d => d._id === form.doctor)?.name || 'Loading...'}
                                                </p>
                                            </div>
                                        </div>
                                        {getDoctorImage(form.doctor) && (
                                            <img 
                                                src={getDoctorImage(form.doctor)} 
                                                alt="Doctor"
                                                className='w-full h-32 object-cover rounded-lg mt-2'
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* نموذج الحجز */}
                    <div className='lg:col-span-2'>
                        <div className='relative group'>
                            {/* تأثير الخلفية */}
                            <div className='absolute -inset-1 bg-gradient-to-r from-[#0097a5]/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
                            
                            <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100/50'>
                                {/* شريط أعلى متدرج */}
                                <div className='h-2 bg-gradient-to-r from-[#0097a5] to-blue-600'></div>
                                
                                <div className='p-8'>
                                    <form className='space-y-8' onSubmit={handleSubmit}>
                                        {/* رسالة التبليغ */}
                                        {message.text && (
                                            <div className={`rounded-xl p-4 backdrop-blur-sm border ${
                                                message.type === 'success' 
                                                    ? 'bg-gradient-to-r from-green-50/90 to-emerald-100/90 border-green-200' 
                                                    : 'bg-gradient-to-r from-red-50/90 to-pink-100/90 border-red-200'
                                            }`}>
                                                <div className='flex items-center'>
                                                    <div className={`flex-shrink-0 p-2 rounded-lg ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                        {message.type === 'success' ? (
                                                            <i className="fas fa-check-circle text-green-600 text-lg"></i>
                                                        ) : (
                                                            <i className="fas fa-exclamation-circle text-red-600 text-lg"></i>
                                                        )}
                                                    </div>
                                                    <div className='ml-3'>
                                                        <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                                            {message.text}
                                                        </p>
                                                        {message.type === 'success' && (
                                                            <p className='text-sm text-green-700 mt-1'>
                                                                Redirecting to your appointments...
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {!user && (
                                            <div className='bg-gradient-to-r from-amber-50/90 to-yellow-100/90 backdrop-blur-sm border border-amber-200 p-4 rounded-xl'>
                                                <div className='flex items-center'>
                                                    <i className="fas fa-exclamation-triangle text-amber-600 text-xl mr-3"></i>
                                                    <div>
                                                        <h4 className='font-bold text-amber-800'>Login Required</h4>
                                                        <p className='text-sm text-amber-700'>
                                                            Please login to book an appointment
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className='space-y-6'>
                                            
                                            <div className='space-y-3'>
                                                <label htmlFor='doctor' className='block text-sm font-semibold text-gray-700 flex items-center'>
                                                    <div className='w-6 h-6 bg-gradient-to-r from-[#0097a5] to-blue-600 rounded-lg flex items-center justify-center mr-2'>
                                                        <i className="fas fa-user-md text-white text-xs"></i>
                                                    </div>
                                                    Select Doctor
                                                </label>
                                                {isLoadingDoctors ? (
                                                    <div className='flex items-center justify-center py-8 bg-gradient-to-r from-blue-50/50 to-white/50 rounded-xl border border-gray-100/50'>
                                                        <div className='animate-spin rounded-full h-8 w-8 border-2 border-[#0097a5] border-t-transparent'></div>
                                                        <span className='ml-3 text-gray-600 font-medium'>Loading doctors...</span>
                                                    </div>
                                                ) : (
                                                    <div className='relative group'>
                                                        <div className='absolute -inset-1 bg-gradient-to-r from-blue-50/50 to-white/50 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300'></div>
                                                        <select
                                                            id='doctor'
                                                            name='doctor'
                                                            value={form.doctor}
                                                            onChange={handleChange}
                                                            required
                                                            className='relative block w-full px-4 py-3.5 pl-12 border border-gray-200/50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097a5]/30 focus:border-[#0097a5] sm:text-sm bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200'
                                                        >
                                                            <option value='' className='text-gray-400'>Choose a doctor...</option>
                                                            {doctor.map((doc) => (
                                                                <option key={doc._id} value={doc._id} className='text-gray-700 py-2'>
                                                                    Dr. {doc.name} - {doc.specialty}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}
                                            </div>

                                            {/* تاريخ ووقت الموعد - محسّن */}
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                {/* تاريخ الموعد */}
                                                <div className='space-y-3'>
                                                    <label htmlFor='date' className='block text-sm font-semibold text-gray-700 flex items-center'>
                                                        <div className='w-6 h-6 bg-gradient-to-r from-[#0097a5] to-blue-600 rounded-lg flex items-center justify-center mr-2'>
                                                            <i className="fas fa-calendar-day text-white text-xs"></i>
                                                        </div>
                                                        Appointment Date
                                                    </label>
                                                    <div className='relative group pr-14'>
                                                        <div className='absolute -inset-1 bg-gradient-to-r from-blue-50/50 to-white/50 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300'></div>
                                                        <input
                                                            id='date'
                                                            name='date'
                                                            type='date'
                                                            value={form.date}
                                                            onChange={handleChange}
                                                            required
                                                            min={today}
                                                            className='relative block w-full px-4 py-3.5 pl-12 border border-gray-200/50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097a5]/30 focus:border-[#0097a5] sm:text-sm bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200'
                                                        />
                                                        <div className='absolute left-3 top-1/3 transform -translate-y-1/2 text-[#0097a5]'>
                                                            <i className="fas fa-calendar text-lg"></i>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2 mt-3'>
                                                        <button
                                                            type='button'
                                                            onClick={() => setForm({...form, date: today})}
                                                            className='flex-1 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium rounded-lg hover:from-blue-100 hover:to-blue-200 hover:shadow-md transition-all duration-200 border border-blue-200 flex items-center justify-center'
                                                        >
                                                            <i className="fas fa-bolt text-xs mr-2"></i>
                                                            Today
                                                        </button>
                                                        <button
                                                            type='button'
                                                            onClick={() => setForm({...form, date: tomorrow})}
                                                            className='flex-1 px-3 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 font-medium rounded-lg hover:from-emerald-100 hover:to-emerald-200 hover:shadow-md transition-all duration-200 border border-emerald-200 flex items-center justify-center'
                                                        >
                                                            <i className="fas fa-sun text-xs mr-2"></i>
                                                            Tomorrow
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* وقت الموعد */}
                                                <div className='space-y-3'>
                                                    <label className='block text-sm font-semibold text-gray-700 flex items-center'>
                                                        <div className='w-6 h-6 bg-gradient-to-r from-[#0097a5] to-blue-600 rounded-lg flex items-center justify-center mr-2'>
                                                            <i className="fas fa-clock text-white text-xs"></i>
                                                        </div>
                                                        Preferred Time Slots
                                                    </label>
                                                    <div className='grid grid-cols-2 gap-3'>
                                                        {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
                                                            <button
                                                                key={time}
                                                                type='button'
                                                                onClick={() => {
                                                                    if (form.date) {
                                                                        const [timeStr, modifier] = time.split(' ')
                                                                        let [hours, minutes] = timeStr.split(':')
                                                                        if (modifier === 'PM' && hours !== '12') hours = parseInt(hours) + 12
                                                                        if (modifier === 'AM' && hours === '12') hours = '00'
                                                                        
                                                                        const dateObj = new Date(form.date)
                                                                        dateObj.setHours(parseInt(hours), parseInt(minutes))
                                                                        setForm({...form, date: dateObj.toISOString()})
                                                                    }
                                                                }}
                                                                className={`px-4 py-3 text-sm font-medium rounded-xl border transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 
                                                                    ${form.date.includes(time.split(' ')[0]) 
                                                                        ? 'bg-gradient-to-r from-[#0097a5] to-blue-600 text-white border-[#0097a5] shadow-md' 
                                                                        : 'bg-gradient-to-r from-gray-50 to-white text-gray-700 border-gray-200 hover:border-[#0097a5] hover:shadow-md hover:bg-blue-50'
                                                                    }`}
                                                            >
                                                                <div className='flex flex-col items-center'>
                                                                    <span className='font-bold'>{time.split(':')[0]}:{time.split(':')[1].split(' ')[0]}</span>
                                                                    <span className='text-xs opacity-75'>{time.split(' ')[1]}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* سبب الزيارة - محسّن */}
                                            <div className='space-y-3'>
                                                <label htmlFor='reason' className='block text-sm font-semibold text-gray-700 flex items-center'>
                                                    <div className='w-6 h-6 bg-gradient-to-r from-[#0097a5] to-blue-600 rounded-lg flex items-center justify-center mr-2'>
                                                        <i className="fas fa-comment-medical text-white text-xs"></i>
                                                    </div>
                                                    Reason for Visit
                                                </label>
                                                <div className='relative group'>
                                                    <div className='absolute -inset-1 bg-gradient-to-r from-blue-50/50 to-white/50 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300'></div>
                                                    <textarea
                                                        id='reason'
                                                        name='reason'
                                                        value={form.reason}
                                                        onChange={handleChange}
                                                        required
                                                        rows='5'
                                                        placeholder='Please provide details about your symptoms, concerns, or the purpose of your visit...'
                                                        className='relative block w-full px-4 py-4 border border-gray-200/50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097a5]/30 focus:border-[#0097a5] sm:text-sm bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 resize-none'
                                                    />
                                                </div>
                                                <div className='flex items-center text-xs text-gray-500 bg-gradient-to-r from-gray-50/50 to-white/50 p-2 rounded-lg'>
                                                    <i className="fas fa-info-circle text-[#0097a5] mr-2"></i>
                                                    Be as detailed as possible to help the doctor prepare for your visit
                                                </div>
                                            </div>
                                        </div>

                                        {/* زر الحجز - محسّن */}
                                        <div className='pt-8'>
                                            <div className='flex justify-center'>
                                                <button
                                                    type='submit'
                                                    disabled={isLoading || !user}
                                                    className={`relative group w-full max-w-md flex justify-center items-center py-4 px-8 rounded-xl text-white font-bold text-lg
                                                        ${isLoading || !user
                                                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                                                            : 'bg-gradient-to-r from-[#0097a5] via-blue-600 to-[#0097a5] bg-[length:200%_auto] hover:bg-[position:100%_0] hover:shadow-2xl'
                                                        } transition-all duration-700 transform hover:-translate-y-1 active:translate-y-0`}
                                                >
                                                    {isLoading ? (
                                                        <div className='flex items-center'>
                                                            <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3'></div>
                                                            <span className='relative'>Booking Appointment...</span>
                                                        </div>
                                                    ) : !user ? (
                                                        <div className='flex items-center'>
                                                            <i className="fas fa-lock mr-3"></i>
                                                            <span className='relative'>Login Required</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className='absolute -inset-1 bg-gradient-to-r from-[#0097a5]/20 to-blue-600/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
                                                            <div className='flex items-center relative'>
                                                                <i className="fas fa-calendar-plus mr-3 text-xl"></i>
                                                                <span>Book Appointment Now</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* روابط مفيدة - محسّن */}
                                        <div className='text-center pt-8 border-t border-gray-100/50'>
                                            <p className='text-sm text-gray-700 mb-4 font-medium'>
                                                Need assistance with your booking?
                                            </p>
                                            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                                <Link 
                                                    to="/allDoctors"
                                                    className='group px-4 py-2 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-xl hover:from-blue-100 hover:to-white hover:border-blue-300 hover:shadow-md transition-all duration-200 flex items-center justify-center'
                                                >
                                                    <i className="fas fa-user-md text-[#0097a5] mr-2 group-hover:text-blue-700"></i>
                                                    <span className='text-sm text-gray-700 font-medium group-hover:text-blue-800'>View All Doctors</span>
                                                </Link>
                                                <Link 
                                                    to="/my-appointment"
                                                    className='group px-4 py-2 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex items-center justify-center'
                                                >
                                                    <i className="fas fa-history text-emerald-600 mr-2 group-hover:text-emerald-700"></i>
                                                    <span className='text-sm text-gray-700 font-medium group-hover:text-emerald-800'>My Appointments</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* خطوط زخرفية في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
            
            {/* تأثيرات CSS للـ animate-blob */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    background: transparent;
                    bottom: 0;
                    color: transparent;
                    cursor: pointer;
                    height: auto;
                    left: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: auto;
                }
            `}</style>
        </section>
    )
}

export default AddAppointment