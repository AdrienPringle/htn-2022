export default function handler(request, response) {
	response.status(200).json({ isActive: true });
}
