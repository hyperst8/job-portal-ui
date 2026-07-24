import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useJobsData } from '../contexts/JobsDataContext'

export const JobsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFilter, setActiveFilter] = useState('Recent')
  const [displayCount, setDisplayCount] = useState(6)
  const { theme } = useTheme()
  const { jobs, loading } = useJobsData()

  const isDark = theme === 'dark'
  const cx = (light, dark) => (isDark ? dark : light)

  const categories = ['All', 'Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'Healthcare']
  const filters = ['Recent', 'Popular', 'Salary', 'Remote']

  const filteredJobs = useMemo(() => {
    let filtered = jobs

    if (activeCategory !== 'All') {
      filtered = filtered.filter(job => job.category === activeCategory)
    }

    switch (activeFilter) {
      case 'Recent':
        filtered = [...filtered].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        break
      case 'Popular':
        filtered = [...filtered].sort((a, b) => b.applicationsCount - a.applicationsCount)
        break
      case 'Salary':
        filtered = [...filtered].sort((a, b) => b.salary.max - a.salary.max)
        break
      case 'Remote':
        filtered = filtered.filter(job => job.remote)
        break
      default:
        break
    }

    return filtered
  }, [jobs, activeCategory, activeFilter])

  const displayedJobs = filteredJobs.slice(0, displayCount)

  const formatSalary = (min, max) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const loadMoreJobs = () => {
    setDisplayCount(prev => Math.min(prev + 6, filteredJobs.length))
  }

  if (loading) {
    return (
      <section
        className={`relative py-24 bg-gradient-to-br overflow-hidden ${cx(
          'from-gray-50 via-white to-gray-100',
          'from-gray-950 via-gray-900 to-gray-800'
        )}`}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-6xl font-black mb-6 ${cx('text-gray-900', 'text-white')}`}>
              Loading Jobs...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`animate-pulse rounded-2xl p-6 h-80 ${cx('bg-white', 'bg-gray-800')}`}></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`relative py-24 bg-gradient-to-br overflow-hidden ${cx(
        'from-gray-50 via-white to-gray-100',
        'from-gray-950 via-gray-900 to-gray-800'
      )}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border bg-gradient-to-r ${cx(
              'from-primary-100 to-purple-100 text-primary-700 border-primary-200/50',
              'from-primary-900/30 to-purple-900/30 text-primary-300 border-primary-700/50'
            )}`}
          >
            💼 Premium Job Opportunities
          </div>
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${cx('text-gray-900', 'text-white')}`}>
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${cx(
                'from-gray-900 via-primary-600 to-purple-600',
                'from-white via-primary-400 to-purple-400'
              )}`}
            >
              Featured Jobs
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${cx('text-gray-600', 'text-gray-300')}`}>
            Discover your next career opportunity from our curated list of premium job postings from top companies worldwide
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative group px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 text-white shadow-2xl shadow-primary-500/25'
                  : cx(
                      'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-400',
                      'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-primary-600'
                    )
              }`}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory !== category && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cx(
                    'from-primary-50 to-purple-50',
                    'from-primary-900/20 to-purple-900/20'
                  )}`}
                ></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className={`text-sm ${cx('text-gray-600', 'text-gray-400')}`}>
            Showing {displayedJobs.length} of {filteredJobs.length} jobs
          </div>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? cx('bg-primary-100 text-primary-700', 'bg-primary-900 text-primary-300')
                    : cx('text-gray-600 hover:bg-gray-100', 'text-gray-400 hover:bg-gray-800')
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedJobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className={`group relative backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border-2 cursor-pointer transform hover:scale-105 hover:-translate-y-2 block ${cx(
                'bg-white border-gray-200 hover:border-primary-400',
                'bg-gray-800 border-gray-700 hover:border-primary-600'
              )}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div
                      className={`mr-4 p-3 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${cx(
                        'from-gray-50 to-gray-100',
                        'from-gray-700 to-gray-800'
                      )}`}
                    >
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className={`text-xl font-bold hidden w-12 h-12 items-center justify-center ${cx('text-primary-600', 'text-primary-400')}`}>
                        {job.company.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 ${cx('text-gray-900', 'text-white')}`}>
                        {job.title}
                      </h3>
                      <p className={`font-semibold ${cx('text-gray-600', 'text-gray-400')}`}>{job.company}</p>
                    </div>
                  </div>
                  {job.workType === 'Remote' && (
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border bg-gradient-to-r ${cx(
                        'from-green-100 to-emerald-100 text-green-800 border-green-200',
                        'from-green-900/50 to-emerald-900/50 text-green-200 border-green-700'
                      )}`}
                    >
                      🌍 Remote
                    </span>
                  )}
                </div>

                <div className={`flex items-center mb-4 space-x-4 ${cx('text-gray-600', 'text-gray-400')}`}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{job.jobType}</span>
                  </div>
                </div>

                <div className="text-2xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  {formatSalary(job.salary.min, job.salary.max)}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills && job.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={`text-sm font-semibold px-4 py-2 rounded-xl border hover:scale-105 transition-transform duration-200 bg-gradient-to-r ${cx(
                        'from-primary-50 to-purple-50 text-primary-700 border-primary-200/50',
                        'from-primary-900/30 to-purple-900/30 text-primary-300 border-primary-700/50'
                      )}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center justify-between pt-4 border-t ${cx('border-gray-100', 'border-gray-700')}`}>
                  <span className={`text-sm font-medium ${cx('text-gray-500', 'text-gray-400')}`}>{getTimeAgo(job.postedDate)}</span>
                  <div className="relative group overflow-hidden bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Apply Now</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {displayCount < filteredJobs.length && (
          <div className="text-center mt-16">
            <button
              onClick={loadMoreJobs}
              className={`relative group px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden border-2 hover:text-white ${cx(
                'bg-white text-primary-600 border-primary-600',
                'bg-gray-800 text-primary-400 border-primary-400'
              )}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Load More Jobs ({filteredJobs.length - displayCount} remaining)
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
