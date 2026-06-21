async function sendNotification(webhookUrl, message) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  if (res.ok) {
    console.log("✅ Notification sent.");
  } else {
    console.error(`❌ Failed to send notification: ${res.status}`);
  }
}

const webhookUrl = process.argv[2];
const message = process.argv[3];
if (!webhookUrl || !message) {
  console.error('Usage: node index.js "<webhook_url>" "<message>"');
  process.exit(1);
}

sendNotification(webhookUrl, message).catch((err) => console.error(err.message));
