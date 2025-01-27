'use client'

import { useState, useEffect } from 'react'
import styles from '../CreatorShop/styles.creatorShop.module.css'
import { ChevronDown } from 'lucide-react'

export default function DatePicker({ isOpen, onClose, onSelect }) {
  const [selectedRange, setSelectedRange] = useState('today')
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 10 }, (_, i) => 
    currentMonth.getFullYear() - 5 + i
  )

  const quickSelects = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last7days', label: 'Last 7 days' },
    { id: 'thisMonth', label: 'This Month' },
  ]

  useEffect(() => {
    // Set initial date range for Today
    const today = new Date()
    setSelectedDates({ start: today, end: today })
  }, [])

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const days = []
    const startPadding = firstDay.getDay()
    
    // Add previous month's days
    for (let i = 0; i < startPadding; i++) {
      const date = new Date(year, month, -startPadding + i + 1)
      days.push({ date, isCurrentMonth: false })
    }
    
    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push({ date, isCurrentMonth: true })
    }
    
    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({ date, isCurrentMonth: false })
    }
    
    return days
  }

  const isDateInRange = (date) => {
    if (!selectedDates.start || !selectedDates.end) return false
    return date >= selectedDates.start && date <= selectedDates.end
  }

  const isDateSelected = (date) => {
    return date.toDateString() === selectedDates?.start?.toDateString() ||
           date.toDateString() === selectedDates?.end?.toDateString()
  }

  const handleQuickSelect = (option) => {
    const end = new Date()
    const start = new Date()
    
    switch(option) {
      case 'today':
        setSelectedDates({ start: end, end })
        break
      case 'yesterday':
        start.setDate(end.getDate() - 1)
        end.setDate(end.getDate() - 1)
        setSelectedDates({ start, end })
        break
      case 'last7days':
        start.setDate(end.getDate() - 6)
        setSelectedDates({ start, end })
        break
      case 'thisMonth':
        start.setDate(1)
        setSelectedDates({ start, end })
        break
    }
    setSelectedRange(option)
  }

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(monthIndex)
    setCurrentMonth(newDate)
    setIsMonthDropdownOpen(false)
  }

  const handleYearSelect = (year) => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(year)
    setCurrentMonth(newDate)
    setIsYearDropdownOpen(false)
  }

  const formatDateRange = () => {
    if (!selectedDates.start || !selectedDates.end) return ''
    const formatDate = (date) => {
      const d = date.getDate()
      const m = months[date.getMonth()].slice(0, 3)
      return `${d} ${m}`
    }
    return `${formatDate(selectedDates.start)} - ${formatDate(selectedDates.end)}`
  }

  if (!isOpen) return null

  return (
    <div className={styles.datePickerOverlay}>
      <div className={styles.datePickerModal}>
        <div className={styles.datePickerHeader}>
          <span className={styles.dateRange}>{formatDateRange()}</span>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className={styles.quickSelectContainer}>
          {quickSelects.map(option => (
            <button
              key={option.id}
              className={`${styles.quickSelectButton} ${selectedRange === option.id ? styles.selected : ''}`}
              onClick={() => handleQuickSelect(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.monthYearSelector}>
          <div className={styles.dropdownContainer}>
            <button 
              className={styles.selectorButton}
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            >
              {months[currentMonth.getMonth()]}
              <ChevronDown size={16} />
            </button>
            {isMonthDropdownOpen && (
              <div className={styles.dropdown}>
                {months.map((month, index) => (
                  <button
                    key={month}
                    className={styles.dropdownItem}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.dropdownContainer}>
            <button 
              className={styles.selectorButton}
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            >
              {currentMonth.getFullYear()}
              <ChevronDown size={16} />
            </button>
            {isYearDropdownOpen && (
              <div className={styles.dropdown}>
                {years.map(year => (
                  <button
                    key={year}
                    className={styles.dropdownItem}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.calendar}>
          <div className={styles.weekDays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.weekDay}>{day}</div>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {generateCalendarDays().map(({ date, isCurrentMonth }, index) => (
              <button
                key={index}
                className={`${styles.dayButton} 
                  ${!isCurrentMonth ? styles.otherMonth : ''} 
                  ${isDateSelected(date) ? styles.selected : ''} 
                  ${isDateInRange(date) ? styles.inRange : ''}`}
                disabled={!isCurrentMonth}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>

        <button 
          className={styles.setDateButton}
          onClick={() => {
            onSelect(selectedDates)
            onClose()
          }}
        >
          Set date
        </button>
      </div>
    </div>
  )
}

