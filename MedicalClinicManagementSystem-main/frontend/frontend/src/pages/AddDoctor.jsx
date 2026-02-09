import React, { useContext, useState } from 'react'
import { AuthContext } from '../components/context/AuthContext'
import { 
  UserPlus, 
  Upload, 
  User, 
  Stethoscope, 
  Award, 
  FileText, 
  Camera,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

function AddDoctor() {
  const { user } = useContext(AuthContext)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    description: "",
    experienceYears: "",
    qualification: "",
    phone: "",
    email: "",
    department: "",
    languages: "",
    image: null
  })

  const specialties = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Ophthalmology",
    "Surgery",
    "Emergency Medicine",
    "Oncology",
    "Radiology",
    "Psychiatry",
    "Dentistry",
    "General Medicine"
  ]

  const departments = [
    "Cardiology Department",
    "Neurology Department",
    "Orthopedics Department",
    "Pediatrics Department",
    "Dermatology Department",
    "Ophthalmology Department",
    "Surgery Department",
    "Emergency Department",
    "Oncology Department",
    "Radiology Department"
  ]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      const file = files[0]
      if (file) {
        if (!file.type.startsWith('image/')) {
          setError("Please select an image file")
          return
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setError("Image size should be less than 5MB")
          return
        }
        setForm({...form, image: file})
        setPreview(URL.createObjectURL(file))
        setError(null)
      }
    } else {
      setForm({...form, [name]: value})
      setError(null)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    setForm({...form, image: null})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    // Basic validation
    if (!form.name.trim()) {
      setError("Name is required")
      setIsSubmitting(false)
      return
    }
    if (!form.specialty) {
      setError("Specialty is required")
      setIsSubmitting(false)
      return
    }
    if (!form.experienceYears || form.experienceYears < 0) {
      setError("Experience years must be a positive number")
      setIsSubmitting(false)
      return
    }
    if (!form.qualification.trim()) {
      setError("Qualification is required")
      setIsSubmitting(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      
      formData.append("name", form.name.trim())
      formData.append("specialty", form.specialty)
      formData.append("description", form.description.trim())
      formData.append("experienceYears", form.experienceYears)
      formData.append("qualification", form.qualification.trim())
      if (form.phone) formData.append("phone", form.phone.trim())
      if (form.email) formData.append("email", form.email.trim())
      if (form.department) formData.append("department", form.department)
      if (form.languages) formData.append("languages", form.languages.trim())
      if (form.image) formData.append("image", form.image)

      const res = await fetch("https://medicalclinicmanagementsystem.onrender.com/doctors/addDoctors", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to add doctor")
      }

      setSuccess("Doctor added successfully!")
      
      // Reset form
      setForm({
        name: "",
        specialty: "",
        description: "",
        experienceYears: "",
        qualification: "",
        phone: "",
        email: "",
        department: "",
        languages: "",
        image: null
      })
      setPreview(null)
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
      
    } catch (error) {
      console.error("Error adding doctor:", error)
      setError(error.message || "An error occurred while adding the doctor")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Only administrators can add new doctors to the system.</p>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Current user role: {user?.role || 'Not logged in'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Add New Doctor</h1>
          <p className="text-gray-600">Fill in the details below to add a new doctor to the system</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800 font-medium">{success}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image Upload */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Camera className="w-5 h-5 text-blue-600 mr-2" />
                    Doctor Photo
                  </h3>
                  
                  <div className="relative group">
                    <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-300 overflow-hidden bg-gray-50 flex flex-col items-center justify-center">
                      {preview ? (
                        <>
                          <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors duration-300 flex items-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-gray-500 font-medium">Upload Photo</p>
                          <p className="text-gray-400 text-sm mt-1">JPG, PNG up to 5MB</p>
                        </>
                      )}
                    </div>
                    
                    <input
                      id="fileInput"
                      onChange={handleChange}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {!preview && (
                      <button
                        type="button"
                        onClick={() => document.getElementById('fileInput').click()}
                        className="w-full mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 py-3 rounded-xl font-medium hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-100 flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Choose Image
                      </button>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <h4 className="font-medium text-gray-700 mb-3">Requirements</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        High-quality professional photo
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Max file size: 5MB
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        JPG, PNG formats only
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 text-blue-600 mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        required
                        placeholder="Dr. John Smith"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        value={form.phone}
                        onChange={handleChange}
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="doctor@hospital.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Languages Spoken
                      </label>
                      <input
                        value={form.languages}
                        onChange={handleChange}
                        type="text"
                        name="languages"
                        placeholder="English, Arabic, French"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 text-blue-600 mr-2" />
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty *
                      </label>
                      <select
                        value={form.specialty}
                        onChange={handleChange}
                        name="specialty"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a specialty</option>
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        value={form.department}
                        onChange={handleChange}
                        name="department"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        value={form.experienceYears}
                        onChange={handleChange}
                        type="number"
                        name="experienceYears"
                        required
                        min="0"
                        max="50"
                        placeholder="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualification *
                      </label>
                      <input
                        value={form.qualification}
                        onChange={handleChange}
                        type="text"
                        name="qualification"
                        required
                        placeholder="MD, Cardiology Specialist"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-2" />
                    Additional Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Description *
                    </label>
                    <textarea
                      value={form.description}
                      onChange={handleChange}
                      name="description"
                      required
                      rows="4"
                      placeholder="Provide a detailed professional description of the doctor's expertise, achievements, and approach to patient care..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding Doctor...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5" />
                          Add New Doctor
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          name: "",
                          specialty: "",
                          description: "",
                          experienceYears: "",
                          qualification: "",
                          phone: "",
                          email: "",
                          department: "",
                          languages: "",
                          image: null
                        })
                        setPreview(null)
                        setError(null)
                        setSuccess(null)
                      }}
                      className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
                    >
                      Clear Form
                    </button>
                  </div>
                  
                  <p className="text-gray-500 text-sm mt-4 text-center">
                    * Required fields
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Quick Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            Tips for Adding Doctors
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl">
              <div className="text-blue-600 font-bold mb-2">Professional Photo</div>
              <p className="text-gray-600 text-sm">Use high-quality, professional headshots with proper lighting.</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-blue-600 font-bold mb-2">Complete Information</div>
              <p className="text-gray-600 text-sm">Fill all required fields with accurate and detailed information.</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-blue-600 font-bold mb-2">Verification</div>
              <p className="text-gray-600 text-sm">Verify all professional credentials before submission.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDoctor