# Disaster Response Platform - Fast Build Requirements

## 🎯 **Project Overview**
**Duration:** 8-9 hours  
**Stack:** MERN (MongoDB → Supabase PostgreSQL)  
**Focus:** Backend-heavy disaster coordination platform with real-time data aggregation

## 🏗️ **Core Architecture**

### **Backend Priority (Node.js + Express)**
- **REST APIs** for all disaster operations
- **WebSocket integration** for real-time updates
- **External API orchestration** (Gemini, Maps, Social Media)
- **Geospatial queries** using Supabase PostGIS
- **Caching layer** for API rate limiting

### **Database Design (Supabase PostgreSQL)**
```sql
disasters: id, title, location_name, location(GEOGRAPHY), description, tags[], owner_id, created_at, audit_trail(JSONB)
reports: id, disaster_id, user_id, content, image_url, verification_status, created_at
resources: id, disaster_id, name, location_name, location(GEOGRAPHY), type, created_at
cache: key, value(JSONB), expires_at
```

## 🔧 **Implementation Phases**

### **Phase 1: Foundation (2 hours)**
1. **Database Setup**
   - Supabase project creation
   - Table schema with geospatial indexes
   - Sample data insertion

2. **Basic API Structure**
   - Express server setup
   - Authentication middleware (mock users)
   - Error handling & logging

### **Phase 2: Core APIs (3 hours)**
1. **Disaster Management**
   ```
   POST /disasters - Create disaster
   GET /disasters?tag=flood - Filter disasters
   PUT /disasters/:id - Update disaster
   DELETE /disasters/:id - Delete disaster
   ```

2. **Location Intelligence**
   ```
   POST /geocode - Gemini location extraction + mapping service conversion
   GET /disasters/:id/resources?lat=...&lng=... - Geospatial resource lookup
   ```

### **Phase 3: External Integrations (2.5 hours)**
1. **Google Gemini API**
   - Location name extraction from descriptions
   - Image verification for authenticity

2. **Mapping Service** (choose one)
   - Google Maps Geocoding API
   - Mapbox Geocoding
   - OpenStreetMap Nominatim

3. **Social Media Monitoring**
   - Mock Twitter API implementation
   - Real Twitter API (if accessible)
   - Bluesky API (alternative)

4. **Official Updates**
   - Web scraping for FEMA/Red Cross updates
   - Browse Page integration

### **Phase 4: Real-time & Optimization (1.5 hours)**
1. **WebSocket Implementation**
   ```javascript
   emit('disaster_updated')
   emit('social_media_updated')
   emit('resources_updated')
   ```

2. **Caching Strategy**
   - Supabase cache table
   - 1-hour TTL for external APIs
   - Rate limiting protection

3. **Geospatial Optimization**
   - ST_DWithin queries for proximity search
   - Geospatial indexes (GIST)

## 🎨 **Minimal Frontend (1 hour)**
- **Single page application** (technology choice: React/Vanilla JS/Vue)
- **Forms:** Disaster creation, report submission
- **Displays:** Disasters list, social media feed, resources map
- **Real-time:** WebSocket connection for live updates

## 🔌 **API Endpoints Summary**

| Method | Endpoint                          | Purpose                         |
| ------ | --------------------------------- | ------------------------------- |
| POST   | `/disasters`                      | Create disaster record          |
| GET    | `/disasters`                      | List/filter disasters           |
| GET    | `/disasters/:id/social-media`     | Social media reports            |
| GET    | `/disasters/:id/resources`        | Nearby resources (geospatial)   |
| GET    | `/disasters/:id/official-updates` | Government updates              |
| POST   | `/disasters/:id/verify-image`     | Gemini image verification       |
| POST   | `/geocode`                        | Location extraction + geocoding |

## 🚀 **Fast Development Strategy**

### **Use AI Tools Aggressively**
- **Cursor Composer** for API route generation
- **Windsurf Cascade** for Supabase query optimization
- **Prompts:**
  - "Generate Node.js route for geospatial disaster lookup"
  - "Create Supabase caching logic with TTL"
  - "Build WebSocket handler for real-time updates"

### **Smart Shortcuts**
1. **Mock Authentication:** Hard-coded users (`netrunnerX`, `reliefAdmin`)
2. **Fallback APIs:** Mock responses when external APIs fail
3. **Sample Data:** Pre-populated disasters for testing
4. **Error Gracefully:** Return meaningful messages, not crashes

## 📦 **External Service Setup**

### **Required API Keys**
- **Google Gemini:** https://aistudio.google.com/app/apikey
- **Google Maps:** https://console.cloud.google.com (or Mapbox/OSM)
- **Twitter:** https://developer.twitter.com (or use mock)
- **Supabase:** https://supabase.com (free tier)

### **Rate Limiting Strategy**
- Cache all external API responses
- Implement exponential backoff
- Graceful degradation with mock data

## 🎯 **Success Criteria**

### **Must Have (8 hours)**
- ✅ All CRUD operations for disasters
- ✅ Gemini location extraction working
- ✅ Geospatial queries returning nearby resources
- ✅ Real-time WebSocket updates
- ✅ Caching layer functional
- ✅ Basic frontend testing all APIs

### **Nice to Have (9th hour)**
- ⭐ Priority alert system for urgent reports
- ⭐ Enhanced image verification
- ⭐ Interactive map visualization
- ⭐ Advanced social media filtering

## 📋 **Submission Checklist**

1. **GitHub Repository** (public/shared access)
2. **Live Demo** (Vercel frontend + Render backend)
3. **Documentation** noting AI tool usage
4. **Zip File** with complete codebase

**Focus:** Ship working backend APIs first, then minimal frontend for testing. Use AI tools for complex logic generation and mention their impact in submission notes.