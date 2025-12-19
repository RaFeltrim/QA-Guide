# Checklist Template

## Standard Structure

[Title]

[Introduction contextualizing the checklist]

[Checklist with numbered and explanatory items]

[Call to action for additional resources]

---

## Filled Example

# Release Checklist: Go/No-Go

## Before releasing a new version, validate these critical points

A well-defined checklist can be the difference between a smooth release and an incident in production. Use this list to ensure nothing important escapes before deployment.

## ✅ Complete Checklist

1. **Automated tests passing**
   - [ ] CI pipeline with all steps green
   - [ ] Minimum code coverage achieved (80%+)
   - [ ] Regression tests executed successfully

2. **Manual validation**
   - [ ] Critical user flows tested (login, payment, etc.)
   - [ ] Supported browsers and devices verified
   - [ ] Internationalization validated (if applicable)

3. **Security**
   - [ ] Vulnerability scans executed (dependencies and code)
   - [ ] Access permissions reviewed
   - [ ] Sensitive data protected in logs

4. **Performance**
   - [ ] Load tests executed with metrics within SLA
   - [ ] Response times acceptable on all endpoints
   - [ ] Memory/CPU usage within expected limits

5. **Monitoring and observability**
   - [ ] Structured logs implemented
   - [ ] Business metrics configured
   - [ ] Alerts configured for critical scenarios

6. **Documentation**
   - [ ] Changelog updated with changes
   - [ ] API documentation updated (if applicable)
   - [ ] Migration guides available (if breaking changes)

7. **Compliance and regulatory**
   - [ ] LGPD/GDPR compliance verified (if applicable)
   - [ ] Accessibility audits conducted (if applicable)
   - [ ] Domain-specific requirements validated

8. **Communication**
   - [ ] Stakeholders notified about the release
   - [ ] Rollback plan prepared and tested
   - [ ] Support team aware of changes

## Ready for release?

If all items above are checked, you're ready to proceed with deployment. Otherwise, identify pending items and resolve before proceeding.

📚 **Want a complete release process template?** Check out our guide on [CI/CD for QA](../../03-NIVEL-JUNIOR/05-ci-github-actions.md).

---

## Common Variations

### Smoke Testing Checklist
- [ ] Application initializes correctly
- [ ] Main screens load without errors
- [ ] Critical functionalities respond
- [ ] External integrations accessible

### Regression Testing Checklist
- [ ] Critical test cases executed
- [ ] Old functionalities still working
- [ ] Data migrated correctly (if applicable)
- [ ] Performance maintained or improved

### Environment Preparation Checklist
- [ ] Environment variables configured
- [ ] Database provisioned and migrated
- [ ] Dependent services available
- [ ] Security configurations applied

---

## Tips for creating checklists

✅ Keep items clear and objective
✅ Use affirmative language ("Verify X" instead of "X was not verified")
✅ Include acceptance criteria when relevant
✅ Review periodically based on lessons learned
✅ Make accessible to the entire team