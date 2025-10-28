<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <div class="bg-blue-600 text-white text-center pb-6 pt-6">
        <h3 class="text-2xl font-bold">
          {{ isSignUp ? '🚀 Create Account' : '🔐 Welcome Back' }}
        </h3>
        <p class="text-blue-100 mt-2">
          {{ isSignUp ? 'Join TicketHub today' : 'Sign in to your account' }}
        </p>
      </div>

      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="errors.general" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            ⚠️ {{ errors.general }}
          </div>

          <div v-if="isSignUp">
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="formData.name"
              @input="handleInputChange('name', $event.target.value)"
              placeholder="Enter your full name"
              :class="`w-full px-4 py-3 border-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
              }`"
            />
            <p v-if="errors.name" class="text-red-600 text-sm mt-2 flex items-center">
              <span class="mr-1">⚠️</span> {{ errors.name }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              v-model="formData.email"
              @input="handleInputChange('email', $event.target.value)"
              placeholder="Enter your email"
              :class="`w-full px-4 py-3 border-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.email ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
              }`"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-2 flex items-center">
              <span class="mr-1">⚠️</span> {{ errors.email }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              v-model="formData.password"
              @input="handleInputChange('password', $event.target.value)"
              placeholder="Enter your password"
              :class="`w-full px-4 py-3 border-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.password ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
              }`"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-2 flex items-center">
              <span class="mr-1">⚠️</span> {{ errors.password }}
            </p>
          </div>

          <div v-if="isSignUp">
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              v-model="formData.confirmPassword"
              @input="handleInputChange('confirmPassword', $event.target.value)"
              placeholder="Confirm your password"
              :class="`w-full px-4 py-3 border-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
              }`"
            />
            <p v-if="errors.confirmPassword" class="text-red-600 text-sm mt-2 flex items-center">
              <span class="mr-1">⚠️</span> {{ errors.confirmPassword }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <span class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              {{ isSignUp ? 'Creating Account...' : 'Signing In...' }}
            </span>
            <span v-else>{{ isSignUp ? '🚀 Create Account' : '🔐 Sign In' }}</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-slate-600">
            {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
            <button
              @click="toggleMode"
              class="ml-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              {{ isSignUp ? 'Sign In' : 'Sign Up' }}
            </button>
          </p>
        </div>

        <div class="mt-4 text-center">
          <button
            @click="navigateToHome"
            class="text-slate-500 hover:text-slate-700 text-sm hover:underline transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSignUp = ref(false)
const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})
const errors = reactive({})
const loading = ref(false)

const handleInputChange = (name, value) => {
  formData[name] = value
  // Clear error when user starts typing
  if (errors[name]) {
    errors[name] = ''
  }
}

const validateForm = () => {
  const newErrors = {}

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email'
  }

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  if (isSignUp.value) {
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For demo purposes, store user data in localStorage
    if (isSignUp.value) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = users.find(user => user.email === formData.email)

      if (existingUser) {
        errors.email = 'User already exists with this email'
        return
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify(newUser))
    } else {
      // Sign in
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === formData.email && u.password === formData.password)

      if (!user) {
        errors.general = 'Invalid email or password'
        return
      }

      localStorage.setItem('currentUser', JSON.stringify(user))
    }

    // Navigate to dashboard
    router.push('/dashboard')
  } catch (error) {
    errors.general = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  formData.email = ''
  formData.password = ''
  formData.confirmPassword = ''
  formData.name = ''
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

const navigateToHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* No additional styles needed as all styling is handled by Tailwind CSS classes */
</style>
