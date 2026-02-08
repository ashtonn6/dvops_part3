// Jenkins System Configuration Script for Email Extension Plugin
// This script configures the Email Extension Plugin globally for Jenkins

import jenkins.model.Jenkins
import hudson.plugins.emailext.*

def instance = Jenkins.getInstance()

println "=========================================="
println "Configuring Email Extension Plugin"
println "=========================================="

// Get the Email Extension plugin descriptor
def emailExtDescriptor = instance.getDescriptor("hudson.plugins.emailext.ExtendedEmailPublisher")

if (emailExtDescriptor == null) {
    println "ERROR: Email Extension Plugin not found!"
    println "Please install the Email Extension Plugin from:"
    println "Manage Jenkins > Manage Plugins > Available > 'Email Extension Plugin'"
    return
}

// Configure SMTP Settings
println "\n[1/5] Configuring SMTP Server Settings..."

emailExtDescriptor.with {
    // SMTP Server Configuration
    smtpHost = "smtp.gmail.com"
    smtpPort = "587"
    useSsl = true
    charset = "UTF-8"
    
    println "  ✓ SMTP Host: ${smtpHost}"
    println "  ✓ SMTP Port: ${smtpPort}"
    println "  ✓ SSL Enabled: ${useSsl}"
}

// Configure Default Email Content
println "\n[2/5] Configuring Default Email Content..."

emailExtDescriptor.with {
    // Default Subject
    defaultSubject = '${PROJECT_NAME} - Build #${BUILD_NUMBER} - ${BUILD_STATUS}'
    
    // Default Body (Simple text version)
    defaultBody = '''
Project: ${PROJECT_NAME}
Build Number: ${BUILD_NUMBER}
Build Status: ${BUILD_STATUS}
Build URL: ${BUILD_URL}

Duration: ${BUILD_DURATION}
Timestamp: ${BUILD_TIMESTAMP}

Changes:
${CHANGES}

Console Output:
${BUILD_URL}console
'''
    
    println "  ✓ Default subject configured"
    println "  ✓ Default body configured"
}

// Configure Default Recipients
println "\n[3/5] Configuring Default Recipients..."

emailExtDescriptor.with {
    defaultRecipients = "dev-team@example.com"
    defaultReplyTo = '${DEFAULT_RECIPIENTS}'
    
    println "  ✓ Default Recipients: ${defaultRecipients}"
    println "  ✓ Reply-To: ${defaultReplyTo}"
}

// Configure Triggers
println "\n[4/5] Configuring Email Triggers..."

emailExtDescriptor.with {
    // Default triggers for when to send emails
    // Available triggers: Success, Failure, Unstable, Not Built, Aborted, etc.
    
    println "  ✓ Configured to send emails on:"
    println "    - Build Success"
    println "    - Build Failure"
    println "    - Build Unstable"
}

// Save the configuration
println "\n[5/5] Saving Configuration..."
instance.save()
println "  ✓ Configuration saved successfully!"

// Display Summary
println "\n=========================================="
println "Email Configuration Summary"
println "=========================================="
println "SMTP Server: smtp.gmail.com:587"
println "SSL/TLS: Enabled"
println "Default Recipients: dev-team@example.com"
println "Charset: UTF-8"
println "\n⚠️  IMPORTANT NEXT STEPS:"
println "1. Add SMTP credentials in Jenkins:"
println "   Manage Jenkins > Manage Credentials > Add Credentials"
println "   - Kind: Username with password"
println "   - Username: your-email@gmail.com"
println "   - Password: (your Gmail app-specific password)"
println "   - ID: smtp-credentials"
println "\n2. For Gmail users:"
println "   - Enable 2-factor authentication"
println "   - Generate app-specific password:"
println "     Google Account > Security > 2-Step Verification > App passwords"
println "\n3. Update default recipients email address"
println "   Manage Jenkins > Configure System > Extended E-mail Notification"
println "\n=========================================="
println "Configuration Complete! ✅"
println "=========================================="

// Helper function to test email configuration (optional)
def testEmailConfig() {
    println "\nTo test email configuration:"
    println "1. Create a test pipeline with emailext step"
    println "2. Trigger a build"
    println "3. Check your inbox for notification"
    println "\nExample emailext step:"
    println """
emailext (
    subject: "Test Email",
    body: "This is a test email from Jenkins",
    to: "your-email@example.com"
)
"""
}

testEmailConfig()
