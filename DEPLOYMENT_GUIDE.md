# Finance Tracker - Deployment Guide

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- Environment variables configured

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

Create `.env` file with Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Production Deployment

### Static Hosting (Recommended)

#### Vercel
```bash
vercel deploy
```

#### Netlify
```bash
netlify deploy --prod --dir=dist
```

#### AWS S3 + CloudFront
```bash
aws s3 sync dist/ s3://your-bucket/
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Docker Deployment

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

---

## Configuration

### Build Optimization
- Code splitting enabled (Vendor/Charts/Supabase chunks)
- Gzip compression: ~235 KB
- Service worker for offline support
- PWA manifest for installability

### Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self' https://api.supabase.co
```

### CORS Configuration
```
Access-Control-Allow-Origin: your-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Database Setup

### Migrations
```bash
# Apply all migrations (automatic with Supabase)
supabase db push
```

### RLS Verification
All tables have Row Level Security enabled by default. Verify:
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND EXISTS (
  SELECT 1 FROM information_schema.table_constraints
  WHERE table_schema = 'public'
  AND table_name = tablename
)
```

---

## Performance Monitoring

### Bundle Analysis
```bash
npm run build -- --report
```

### Metrics to Monitor
- **FCP** (First Contentful Paint): < 1s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3s

### Recommended Tools
- Google Lighthouse
- Web Vitals
- Sentry for error tracking
- LogRocket for session replay

---

## Scaling Considerations

### Frontend Scaling
- Enable CDN caching (CloudFlare, AWS CloudFront)
- Use edge locations for static assets
- Implement service worker caching
- Enable gzip compression

### Backend Scaling
- Use Supabase read replicas
- Implement Redis caching for frequent queries
- Enable database connection pooling
- Monitor query performance

### Database Scaling
- Implement proper indexing
- Archive historical data
- Use partitioning for large tables
- Monitor storage growth

---

## Monitoring & Logging

### Setup Application Monitoring
```typescript
// Error tracking
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Analytics
gtag.config({
  measurement_id: process.env.VITE_GA_ID,
});
```

### Logs to Monitor
- Authentication failures
- API errors (500+)
- Performance metrics
- User activity anomalies
- Database connection issues

---

## Backup & Recovery

### Database Backups
```bash
# Supabase automatic backups
# Set up in dashboard: Database > Backups

# Point-in-time recovery available
# Keep 30-day retention policy
```

### Data Export
```bash
# Users can export their data
supabase --project-id your_project export > backup.sql
```

---

## Security Checklist

- ✅ HTTPS/TLS configured
- ✅ RLS enabled on all tables
- ✅ API keys rotated regularly
- ✅ CORS properly configured
- ✅ Rate limiting implemented
- ✅ 2FA enabled for admin accounts
- ✅ Backups tested monthly
- ✅ Security audit completed
- ✅ Dependencies updated
- ✅ Error handling configured

---

## Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Performance Issues
```bash
# Analyze bundle
npm run build -- --report

# Check Lighthouse score
lighthouse https://your-domain.com
```

### Authentication Issues
- Verify Supabase URL and ANON_KEY
- Check CORS configuration
- Verify RLS policies
- Check JWT token expiration

### Database Connection Issues
- Verify connection string
- Check database status
- Monitor connection pool
- Implement retry logic

---

## Support & Resources

### Documentation
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)

### Community
- GitHub Issues: Report bugs
- Discussions: Ask questions
- Stack Overflow: General support
- Discord Communities: Real-time help

---

## Deployment Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] RLS policies verified
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] CDN setup
- [ ] Backup strategy implemented
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] Analytics setup
- [ ] Security headers configured
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] PWA tested on devices
- [ ] Accessibility audit completed
- [ ] SEO optimized
- [ ] Load testing completed
- [ ] Disaster recovery plan ready

---

**Happy Deployment! 🚀**
