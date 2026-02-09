import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import { Link } from 'react-router-dom'

function MyAppointment() {
    const { user } = useContext(AuthContext)
    const [appointment, setAppointment] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [cancelingId, setCancelingId] = useState(null)

    useEffect(() => {
        const fetchAppointment = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem('token')
                const res = await fetch('https://medicalclinicmanagementsystem.onrender.com/appointments/myAppointments', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await res.json()
                
                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch appointments")
                }
                
                setAppointment(data)
            } catch (error) {
                console.error(error)
                setMessage({ type: 'error', text: error.message || "Failed to load appointments" })
            } finally {
                setIsLoading(false)
            }
        }
        fetchAppointment()
    }, [])

    const cancelAppointment = async (id) => {
        setCancelingId(id)
        setMessage({ type: '', text: '' })
        
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`https://medicalclinicmanagementsystem.onrender.com/appointments/deleteAppointment/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            
            const data = await res.json()
            
            if (!res.ok) {
                throw new Error(data.message || "Failed to cancel appointment")
            }
            
            setAppointment(prevAppointment => 
                prevAppointment.filter((a) => a._id !== id)
            )
            
            setMessage({ type: 'success', text: 'Appointment cancelled successfully' })
            setTimeout(() => setMessage({ type: '', text: '' }), 3000)
        } catch (error) {
            console.error(error)
            setMessage({ type: 'error', text: error.message || "Error cancelling appointment" })
        } finally {
            setCancelingId(null)
        }
    }

    const handleCancelClick = (id, doctorName) => {
        if (window.confirm(`Are you sure you want to cancel your appointment with Dr. ${doctorName}?`)) {
            cancelAppointment(id)
        }
    }

    const getAppointmentColor = (date) => {
        const appointmentDate = new Date(date)
        const today = new Date()
        const diffDays = Math.ceil((appointmentDate - today) / (1000 * 60 * 60 * 24))
        
        if (diffDays < 0) return 'from-red-500 to-pink-500' // Past
        if (diffDays <= 2) return 'from-amber-500 to-orange-500' // Upcoming (within 2 days)
        if (diffDays <= 7) return 'from-blue-500 to-cyan-500' // Upcoming (within week)
        return 'from-green-500 to-emerald-500' // Future
    }

    const getStatusText = (date) => {
        const appointmentDate = new Date(date)
        const today = new Date()
        const diffDays = Math.ceil((appointmentDate - today) / (1000 * 60 * 60 * 24))
        
        if (diffDays < 0) return 'Completed'
        if (diffDays === 0) return 'Today'
        if (diffDays === 1) return 'Tomorrow'
        if (diffDays <= 7) return 'This Week'
        return 'Upcoming'
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
            <div className='relative z-10 max-w-5xl mx-auto'>
                {/* العنوان الرئيسي */}
                <div className='text-center mb-10'>
                    <div className='inline-block relative'>
                        <h2 className='text-3xl md:text-4xl font-bold text-[#0097a5] mb-4 relative z-10'>
                            My <span className='text-blue-800'>Appointments</span>
                        </h2>
                        <div className='absolute -bottom-2 left-1/4 w-1/2 h-2 bg-blue-100 rounded-full z-0'></div>
                    </div>
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mb-6 rounded-full'></div>
                    <p className='text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm'>
                        Manage your scheduled appointments and track your upcoming visits
                    </p>
                </div>

                {/* بطاقة المحتوى الرئيسية */}
                <div className='relative group mb-8'>
                    {/* تأثير الخلفية */}
                    <div className='absolute -inset-1 bg-gradient-to-r from-[#0097a5]/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
                    
                    <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100/50'>
                        {/* شريط أعلى متدرج */}
                        <div className='h-2 bg-gradient-to-r from-[#0097a5] to-blue-600'></div>
                        
                        <div className='p-8'>
                            {/* رسالة التبليغ */}
                            {message.text && (
                                <div className={`mb-6 rounded-xl p-4 backdrop-blur-sm border ${
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
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isLoading ? (
                                <div className='text-center py-16'>
                                    <div className='inline-block relative'>
                                        <div className='animate-spin rounded-full h-16 w-16 border-4 border-[#0097a5] border-t-transparent mx-auto'></div>
                                    </div>
                                    <p className='mt-4 text-gray-700 font-medium'>Loading your appointments...</p>
                                    <div className='w-32 h-1.5 bg-gradient-to-r from-blue-400 to-[#0097a5] mx-auto mt-4 rounded-full'></div>
                                </div>
                            ) : appointment?.length === 0 ? (
                                <div className='text-center py-16'>
                                    <div className='w-24 h-24 bg-gradient-to-br from-blue-100 to-[#0097a5]/20 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                                        <i className="fas fa-calendar-times text-4xl text-[#0097a5]"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Appointments</h3>
                                    <p className="text-gray-700 max-w-md mx-auto mb-6">
                                        You don't have any scheduled appointments. Book your first appointment today!
                                    </p>
                                    <Link 
                                        to="/add-appointment"
                                        className='inline-flex items-center gap-2 bg-gradient-to-r from-[#0097a5] to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1'
                                    >
                                        <i className="fas fa-plus"></i>
                                        Book New Appointment
                                    </Link>
                                </div>
                            ) : (
                                <div className='space-y-6'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                                        <div className='bg-gradient-to-br from-blue-50/80 to-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100/50 text-center'>
                                            <div className='text-2xl font-bold text-[#0097a5]'>{appointment?.length}</div>
                                            <div className='text-sm text-gray-700 font-medium'>Total Appointments</div>
                                        </div>
                                        <div className='bg-gradient-to-br from-emerald-50/80 to-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-100/50 text-center'>
                                            <div className='text-2xl font-bold text-emerald-600'>
                                                {appointment?.filter(a => new Date(a.date) > new Date()).length}
                                            </div>
                                            <div className='text-sm text-gray-700 font-medium'>Upcoming</div>
                                        </div>
                                        <div className='bg-gradient-to-br from-amber-50/80 to-white/80 backdrop-blur-sm p-4 rounded-xl border border-amber-100/50 text-center'>
                                            <div className='text-2xl font-bold text-amber-600'>
                                                {appointment?.filter(a => {
                                                    const appointmentDate = new Date(a.date)
                                                    const today = new Date()
                                                    const diffDays = Math.ceil((appointmentDate - today) / (1000 * 60 * 60 * 24))
                                                    return diffDays >= 0 && diffDays <= 2
                                                }).length}
                                            </div>
                                            <div className='text-sm text-gray-700 font-medium'>Within 2 Days</div>
                                        </div>
                                    </div>

                                    <div className='space-y-4'>
                                        {appointment?.map((app) => (
                                            <div key={app?._id} className='group relative'>
                                                {/* تأثير الخلفية للبطاقة */}
                                                <div className='absolute -inset-0.5 bg-gradient-to-r from-gray-200/50 to-transparent rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500'></div>
                                                
                                                <div className='relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1'>
                                                    {/* شريط الحالة الجانبي */}
                                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${getAppointmentColor(app?.date)}`}></div>
                                                    
                                                    <div className='p-6'>
                                                        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-6'>
                                                            {/* صورة الدكتور */}
                                                            <div className='flex-shrink-0 relative'>
                                                                <div className='w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg'>
                                                                    <img 
                                                                        className='w-full h-full object-cover'
                                                                        src={`https://medicalclinicmanagementsystem.onrender.com/uploads/${app?.doctor?.image}`} 
                                                                        alt={app?.doctor?.name}
                                                                        onError={(e) => {
                                                                            e.target.src = `https://ui-avatars.com/api/?name=${app?.doctor?.name}&background=[#0097a5]&color=white`
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getAppointmentColor(app?.date)}`}>
                                                                    {getStatusText(app?.date)}
                                                                </div>
                                                            </div>
                                                            
                                                            {/* معلومات الموعد */}
                                                            <div className='flex-grow'>
                                                                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                                                                    <div>
                                                                        <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#0097a5] transition-colors duration-300'>
                                                                            Dr. {app.doctor?.name}
                                                                        </h3>
                                                                        <p className='text-gray-600 mt-1 flex items-center'>
                                                                            <i className="fas fa-stethoscope text-[#0097a5] mr-2"></i>
                                                                            {app.doctor?.specialty}
                                                                        </p>
                                                                        <div className='mt-3 space-y-2'>
                                                                            <p className='text-gray-700 flex items-center'>
                                                                                <i className="fas fa-comment-medical text-[#0097a5] mr-3"></i>
                                                                                <span className='font-medium'>Reason:</span> {app.reason}
                                                                            </p>
                                                                            <p className='text-gray-700 flex items-center'>
                                                                                <i className="fas fa-calendar-day text-[#0097a5] mr-3"></i>
                                                                                <span className='font-medium'>Date:</span> {new Date(app?.date).toLocaleDateString('en-US', {
                                                                                    weekday: 'long',
                                                                                    year: 'numeric',
                                                                                    month: 'long',
                                                                                    day: 'numeric'
                                                                                })}
                                                                            </p>
                                                                            <p className='text-gray-700 flex items-center'>
                                                                                <i className="fas fa-clock text-[#0097a5] mr-3"></i>
                                                                                <span className='font-medium'>Time:</span> {new Date(app?.date).toLocaleTimeString('en-US', {
                                                                                    hour: '2-digit',
                                                                                    minute: '2-digit'
                                                                                })}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* زر الإلغاء */}
                                                                    <div className='flex-shrink-0'>
                                                                        <button 
                                                                            onClick={() => handleCancelClick(app?._id, app?.doctor?.name)}
                                                                            disabled={cancelingId === app?._id}
                                                                            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                                                                                cancelingId === app?._id
                                                                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                                                                    : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 hover:shadow-lg border border-red-200/50'
                                                                            }`}
                                                                        >
                                                                            {cancelingId === app?._id ? (
                                                                                <div className='flex items-center'>
                                                                                    <i className="fas fa-spinner animate-spin mr-2"></i>
                                                                                    Cancelling...
                                                                                </div>
                                                                            ) : (
                                                                                <div className='flex items-center'>
                                                                                    <i className="fas fa-times-circle mr-2"></i>
                                                                                    Cancel
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* رابط حجز موعد جديد */}
                <div className='text-center mt-8'>
                    <div className='inline-flex flex-col items-center gap-4'>
                        <p className='text-gray-700 bg-white/50 backdrop-blur-sm p-4 rounded-xl'>
                            Need to schedule a new appointment?
                        </p>
                        <Link 
                            to="/add-appointment"
                            className='relative group'
                        >
                            <div className='absolute -inset-1 bg-gradient-to-r from-[#0097a5] to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
                            <div className='relative bg-gradient-to-r from-[#0097a5] to-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 flex items-center gap-3'>
                                <i className="fas fa-calendar-plus"></i>
                                <span>Book New Appointment</span>
                                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* خطوط زخرفية في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
        </section>
    )
}

export default MyAppointment