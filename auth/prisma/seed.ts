import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	// create a few test users
	const seedUsers = [
		{
			email: "johnjohnson71@example.com",
			username: "johnjohnson71",
			first_name: "John",
			last_name: "Johnson",
			password: await bcrypt.hash("password", 12),
			role: UserRole.admin,
			is_verified: true,
		},
		{
			email: "gracesmith68@demo.com",
			username: "gracesmith68",
			first_name: "Grace",
			last_name: "Smith",
			password: await bcrypt.hash("password", 12),
			role: UserRole.moderator,
			is_verified: true,
		},
		{
			email: "gracejones71@demo.com",
			username: "gracejones71",
			first_name: "Grace",
			last_name: "Jones",
			password: await bcrypt.hash("password", 12),
			role: UserRole.user,
			is_verified: true,
		},
		{
			email: "hankdoe51@test.com",
			username: "hankdoe51",
			first_name: "Hank",
			last_name: "Doe",
			password: await bcrypt.hash("password", 12),
			role: UserRole.user,
			is_verified: true,
		},
		{
			email: "evemartinez82@example.com",
			username: "evemartinez82",
			first_name: "Eve",
			last_name: "Martinez",
			password: await bcrypt.hash("password", 12),
			role: UserRole.admin,
			is_verified: true,
		},
		{
			email: "daviddavis43@test.com",
			username: "daviddavis43",
			first_name: "David",
			last_name: "Davis",
			password: await bcrypt.hash("password", 12),
			role: UserRole.moderator,
			is_verified: true,
		},
		{
			email: "bobwilliams93@demo.com",
			username: "bobwilliams93",
			first_name: "Bob",
			last_name: "Williams",
			password: await bcrypt.hash("password", 12),
			role: UserRole.user,
			is_verified: true,
		},
		{
			email: "alicebrown22@example.com",
			username: "alicebrown22",
			first_name: "Alice",
			last_name: "Brown",
			password: await bcrypt.hash("password", 12),
			role: UserRole.user,
			is_verified: true,
		},
		{
			email: "frankgarcia14@test.com",
			username: "frankgarcia14",
			first_name: "Frank",
			last_name: "Garcia",
			password: await bcrypt.hash("password", 12),
			role: UserRole.admin,
			is_verified: true,
		},
		{
			email: "charliemiller37@demo.com",
			username: "charliemiller37",
			first_name: "Charlie",
			last_name: "Miller",
			password: await bcrypt.hash("password", 12),
			role: UserRole.user,
		},
	];

	for (const user of seedUsers) {
		await prisma.users.create({
			data: {
				email: user.email,
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				password: user.password,
				role: user.role,
				is_verified: user.is_verified,
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
