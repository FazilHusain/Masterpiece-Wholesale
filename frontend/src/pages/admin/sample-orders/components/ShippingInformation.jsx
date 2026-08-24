import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";

export default function ShippingInformation({
  formData,
  handleChange,
}) {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-[#12312B]">
          Shipping Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Delivery address.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Address"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleChange}
        />

        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

        <Input
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />

      </div>

    </Card>
  );
}