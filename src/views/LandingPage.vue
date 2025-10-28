<template>
  <div class="h-screen w-full bg-slate-100 overflow-x-hidden m-0 p-0">
    <!-- Header -->
    <header class="w-full bg-white shadow-sm border-b border-slate-200">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-slate-900">TicketHub</h1>
        <button
          @click="navigateToLogin"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all transform hover:scale-105"
        >
          🚀 Sign In
        </button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="w-full py-20 px-4 text-slate-900">
      <div class="w-full max-w-7xl mx-auto text-center">
        <h2 class="text-6xl font-bold mb-6 text-balance">
          Manage Your Support Tickets <span class="text-blue-600">Effortlessly</span>
        </h2>
        <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto text-balance">
          Create, track, and resolve support tickets with our intuitive ticket management system. Stay organized and
          keep your team in sync.
        </p>
        <button
          @click="navigateToLogin"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 text-lg"
        >
          🎯 Get Started
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full py-16 px-4">
      <div class="w-full max-w-7xl mx-auto">
        <h3 class="text-4xl font-bold text-center mb-12 text-slate-900">Why Choose TicketHub? ✨</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white shadow-lg border-0 rounded-xl p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-white text-2xl font-bold">⚡</span>
            </div>
            <h4 class="text-2xl font-bold mb-4 text-slate-900">Easy Creation</h4>
            <p class="text-slate-600 leading-relaxed">Create tickets in seconds with our simple and intuitive form interface.</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white shadow-lg border-0 rounded-xl p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div class="w-16 h-16 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-white text-2xl font-bold">📊</span>
            </div>
            <h4 class="text-2xl font-bold mb-4 text-slate-900">Real-time Tracking</h4>
            <p class="text-slate-600 leading-relaxed">Monitor ticket status in real-time with clear visual indicators and updates.</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white shadow-lg border-0 rounded-xl p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div class="w-16 h-16 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-white text-2xl font-bold">🎛️</span>
            </div>
            <h4 class="text-2xl font-bold mb-4 text-slate-900">Full Control</h4>
            <p class="text-slate-600 leading-relaxed">Edit and delete tickets with complete control over your data management.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-12 px-4 mt-16 w-full">
      <div class="container mx-auto text-center">
        <p class="text-slate-500 text-lg">&copy; 2025 TicketHub. All rights reserved.</p>
        <p class="text-slate-400 mt-2">Built with ❤️ for efficient ticket management</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}
</script>

