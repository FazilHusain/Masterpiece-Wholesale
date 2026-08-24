import { Card, Input } from "../../../../components/ui";

export default function CustomerInformation({
  formData,
  errors,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Customer Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Customer details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          error={errors.customerName}
        />

        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

      </div>
    </Card>
  );
}