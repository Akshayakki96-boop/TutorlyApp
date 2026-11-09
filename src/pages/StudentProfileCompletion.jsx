import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'
import './StudentProfileCompletion.css'

export default function StudentProfileCompletion() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    parentFirstName: '',
    parentLastName: '',
    classYear: '',
    subject: '',
    address: '',
  })

  // Load current profile
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const result = await apiRequest('/api/student/auth/profile')
      if (result) {
        setFormData({
          fullName: result.fullName || '',
          phone: result.phone || '',
          parentFirstName: result.parentFirstName || '',
          parentLastName: result.parentLastName || '',
          classYear: result.classYear || '',
          subject: result.subject || '',
          address: result.address || '',
        })
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        setError('Full name is required')
        setLoading(false)
        return
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required')
        setLoading(false)
        return
      }
      if (!formData.classYear) {
        setError('Class year is required')
        setLoading(false)
        return
      }
      if (!formData.subject) {
        setError('Subject is required')
        setLoading(false)
        return
      }

      const result = await apiRequest('/api/student/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify(formData),
      })

      if (result) {
        // Redirect to dashboard
        navigate('/student-dashboard', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile')
      console.error('Profile update error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    // Go to dashboard anyway
    navigate('/student-dashboard', { replace: true })
  }

  return (
    <div className="profile-completion-container">
      <div className="profile-completion-card">
        <div className="profile-header">
          <h1>Complete Your Profile</h1>
          <p>Help us personalize your learning experience</p>
        </div>

        {error && (
          <div className="error-alert">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
            />
          </div>

          {/* Parent First Name */}
          <div className="form-group">
            <label htmlFor="parentFirstName">Parent/Guardian First Name</label>
            <input
              type="text"
              id="parentFirstName"
              name="parentFirstName"
              value={formData.parentFirstName}
              onChange={handleChange}
              placeholder="Parent's first name"
            />
          </div>

          {/* Parent Last Name */}
          <div className="form-group">
            <label htmlFor="parentLastName">Parent/Guardian Last Name</label>
            <input
              type="text"
              id="parentLastName"
              name="parentLastName"
              value={formData.parentLastName}
              onChange={handleChange}
              placeholder="Parent's last name"
            />
          </div>

          {/* Class Year */}
          <div className="form-group">
            <label htmlFor="classYear">
              Class Year <span className="required">*</span>
            </label>
            <select
              id="classYear"
              name="classYear"
              value={formData.classYear}
              onChange={handleChange}
              required
            >
              <option value="">Select your class year</option>
              <option value="Year 7">Year 7</option>
              <option value="Year 8">Year 8</option>
              <option value="Year 9">Year 9</option>
              <option value="Year 10">Year 10</option>
              <option value="Year 11">Year 11</option>
              <option value="GCSE">GCSE</option>
              <option value="Year 12">Year 12</option>
              <option value="Year 13">Year 13</option>
              <option value="A-Level">A-Level</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Subject */}
          <div className="form-group">
            <label htmlFor="subject">
              Primary Subject <span className="required">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select your subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Biology">Biology</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Languages">Languages</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              rows="3"
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSkip}
              disabled={loading}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>

        <div className="profile-info">
          <p className="info-text">
            📝 You can update your profile anytime from your dashboard settings.
          </p>
        </div>
      </div>
    </div>
  )
}
