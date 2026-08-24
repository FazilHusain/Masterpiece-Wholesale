import { Card, Input, Textarea } from "../../../../components/ui";

export default function StorySection({
    formData,
    handleChange,
}) {

    return (

        <Card>

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-[#17342F]">
                    Story
                </h2>

                <p className="text-gray-500 mt-1">
                    Tell customers about this collection.
                </p>

            </div>

            <div className="space-y-5">

                <Input
                    label="Story Title"
                    name="storyTitle"
                    value={formData.storyTitle}
                    onChange={handleChange}
                />

                <Textarea
                    label="Story Description"
                    name="storyDescription"
                    rows={5}
                    value={formData.storyDescription}
                    onChange={handleChange}
                />

                <Input
                    label="Story Video URL"
                    name="storyVideo"
                    value={formData.storyVideo}
                    onChange={handleChange}
                    placeholder="https://..."
                />

            </div>

        </Card>

    );

}